import axios from "axios";
export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_SERVERNAME,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,   
    },
});