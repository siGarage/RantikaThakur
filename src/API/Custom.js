import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVERNAME}`,
  headers: { "Content-Type": "application/json" },
});

const genericError = {
  message: "Something went wrong",
  status: 500,
};

function defaultCatch(error, resolve) {
  if (error.response) {
    resolve(error.response);
  } else if (error.request) {
    resolve(error.request);
  } else {
    resolve(genericError);
  }
}

export default class Auth {
  //log in

  static message(values) {
    let payload = values;
    console.log(payload)
    return new Promise((resolve) => {
      instance
        .post("/api/custom-sizes", {data:payload.data})
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }

}


