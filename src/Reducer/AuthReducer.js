import * as ActionType from "../ActionType/AuthAction";

const SignIn = (state, payload) => {
  return { user: payload };
};

// const SignOut = (state, payload) => {
//   localStorage.removeItem("user");
//   return { user: null };
// };

const AuthReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SIGNIN:
      return SignIn(state, action.payload);
    case ActionType.SIGNOUT:
      return { ...state , user : null  };
    default:
      return state;
  }
};

export { AuthReducer };
