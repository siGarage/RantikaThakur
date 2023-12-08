import { combineReducers } from "redux";

import auth from "./auth";
import cart from "./cart";
import product from "./product";

const rootReducer = combineReducers({
  auth: auth,
  cart:cart,
  product:product,
});

export default rootReducer;
