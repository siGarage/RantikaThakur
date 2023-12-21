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

    static setUserData(data,userid,token) {
        let authtoken=token
        return new Promise((resolve) => {
          instance
            .put(`/api/users/${userid}`,data,{headers: {
                'Authorization': 'Bearer ' + authtoken
              }})
            .then((response) => {
              resolve(response);
            })
            .catch((error) => defaultCatch(error, resolve));
        });
      }

      static getUserData(userid,token) {
        let authtoken=token
        return new Promise((resolve) => {
          instance
            .put(`/api/users/${userid}`,{headers: {
                'Authorization': 'Bearer ' + authtoken
              }})
            .then((response) => {
              resolve(response);
            })
            .catch((error) => defaultCatch(error, resolve));
        });
      }


  


 
}


