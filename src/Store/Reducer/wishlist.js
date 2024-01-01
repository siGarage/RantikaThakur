import constants from "../../constants";

const initial_state = {
  wishItems:[]
};

export default function auth(state = initial_state, action) {
  switch (action.type) {
   
    case constants("wishlist").reducers.wishlist.AddToWishlist:
        
      return {
        ...state,
        wishItems: action.payload.wishItems
      };

    default:
      return state;
  }
}