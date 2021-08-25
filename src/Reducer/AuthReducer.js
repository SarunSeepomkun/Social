import * as ActionType from "../ActionType/AuthAction";

const SignIn = (state, payload) => {
  return { user: payload };
};

const SignOut = (state, action) => {
  localStorage.removeItem("user");
  return { user : null };
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SIGNIN:
      return SignIn(state, action.payload);
    case ActionType.SIGNOUT:
      return SignOut(state, action);
    default:
      return state;
  }
};

export { AuthReducer };
