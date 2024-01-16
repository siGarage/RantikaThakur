import axios from "axios";
export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_SERVERNAME,
    headers: { "Content-Type": "application/json" },
});