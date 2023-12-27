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

 // sign up
    static getOrder(authtoken) {
        return new Promise((resolve) => {
          instance
            .get("/api/orders",{headers: {
                'Authorization': 'Bearer ' + authtoken
              }})
            .then((response) => {
              resolve(response);
            })
            .catch((error) => defaultCatch(error, resolve));
        });
      }
  //log in
  
}