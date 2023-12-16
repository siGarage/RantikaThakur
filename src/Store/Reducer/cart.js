import constants from "../../constants";

const initial_state = {
  cartItems:[],
  cartTotalQuantity:0,
};

export default function auth(state = initial_state, action) {
  switch (action.type) {
    //all load
    case constants("cart").reducers.cart.AddToCart:
      return {
        ...state,
        cartItems: action.payload.cartItems
      };

    default:
      return state;
  }
}