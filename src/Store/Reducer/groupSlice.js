import constants from "../../constants";

const initial_state = {
  loading: false,
  groupData:[]
};

export default function group(state = initial_state, action) {
  switch (action.type) {
    //all load
    case constants("group").reducers.group.load:
      return {
        ...state,
        loading: true,
      };

    case constants("group").reducers.group.error:
      return {
        ...state,
        loading: false,
      };

    //LOGIN
    case constants("group").reducers.group.success:
      return {
        ...state,
        loading: false,
        groupData: action.payload.data,
      };

    default:
      return state;
  }
}