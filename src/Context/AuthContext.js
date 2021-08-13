import React, { useReducer, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthReducer } from "../Reducer/AuthReducer";
// import * as AuthAction from "../ActionType/AuthAction";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const AuthContext = createContext(initialState);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.user) {
      const decodeToken = jwtDecode(state.user.token);
      if (decodeToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
      }
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
