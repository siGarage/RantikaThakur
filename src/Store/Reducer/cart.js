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
        cartItems: [...state.cartItems, action.payload.data]
      };

    case constants("cart").reducers.cart.DeleteFromCart:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.data)
      };


    default:
      return state;
  }
}