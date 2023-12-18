import constants from "../../constants";

const initial_state = {
    Products:[]
  };

export default function auth(state = initial_state, action) {
  switch (action.type) {
    //all load
    case constants("product").reducers.product.AddToProducts:
      return {
        ...state,
         Products: action.payload.Products,
      };

    default:
      return state;
  }
}