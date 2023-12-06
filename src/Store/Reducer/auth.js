import constants from "../../constants";

const initial_state = {
  logged_in: false,
  loading: false,
  user: {},
  signup: {},
};

export default function auth(state = initial_state, action) {
  switch (action.type) {
    //all load
    case constants("auth").reducers.login.load:
      return {
        ...state,
        loading: true,
      };

    case constants("auth").reducers.login.error:
      return {
        ...state,
        loading: false,
      };

    //LOGIN
    case constants("auth").reducers.login.success:
      return {
        ...state,
        loading: false,
        logged_in: true,
        user: action.payload.data,
      };

    default:
      return state;
  }
}