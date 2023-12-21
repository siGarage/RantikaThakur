import { combineReducers } from "redux";

import auth from "./auth";
import cart from "./cart";
import product from "./product";
import wishlist from "./wishlist";

const rootReducer = combineReducers({
  auth: auth,
  cart:cart,
  product:product,
  wishlist:wishlist
});

export default rootReducer;
