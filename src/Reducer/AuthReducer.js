import * as ActionType from "../ActionType/AuthAction";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SIGNIN:
      return { user: action.payload };
    case ActionType.SIGNOUT:
      return { user: null };
    default:
      return state;
  }
};

export { AuthReducer };
