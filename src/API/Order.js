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
  static getOrder(userid, authtoken) {
    return new Promise((resolve) => {
      instance
        .get(
          `/api/order-confirmations?filters[Order_By]=${userid}`,
          {
            headers: {
              Authorization: "Bearer " + authtoken,
            },
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }

  static setOrder(data) {
    let data2 = { data: data };
    return new Promise((resolve) => {
      instance
        .post("/api/confirm-orders", data2)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }

  static order(values,token) {
    let payload = values;
    let authtoken=token
    return new Promise((resolve) => {
      instance
        .post("/api/orders", payload, {
          headers: {
            Authorization: "Bearer " + authtoken,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }
}
