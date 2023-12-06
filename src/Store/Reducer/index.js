import { combineReducers } from "redux";

import auth from "./auth";
import group from "./groupSlice";

const rootReducer = combineReducers({
  auth: auth,
  group:group,
});

export default rootReducer;
