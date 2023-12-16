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


  //Create
  static getCartItems(email,token) {
    let userid=email
    let authtoken=token
    return new Promise((resolve) => {
      instance
        .get(`/api/carts?filters[email]=${userid}&populate=*`,{headers: {
            'Authorization': 'Bearer ' + authtoken
          }})
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }

  static deleteCartItems(id,token) {
    let authtoken=token
    return new Promise((resolve) => {
      instance
        .delete(`/api/carts/${id}`,{headers: {
            'Authorization': 'Bearer ' + authtoken
          }})
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }

  
  static addCartItems(values,token) {
    let payload={"data":values};
    let authtoken=token
    return new Promise((resolve) => {
      instance
      .post("/api/carts", payload,{headers: {
            'Authorization': 'Bearer ' + authtoken
          }})
        .then((response) => {
          resolve(response);
        })
        .catch((error) => defaultCatch(error, resolve));
    });
  }
 
}


