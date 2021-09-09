import React, { useReducer, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AuthReducer } from "../Reducer/AuthReducer";
import { useHistory } from "react-router-dom";
// import * as AuthAction from "../ActionType/AuthAction";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const AuthContext = createContext(initialState);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  let history = useHistory();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (state.user) {
    //     const decodeToken = jwtDecode(state.user.token);

    //     if (decodeToken.exp * 1000 < Date.now()) {
    //       localStorage.removeItem("user");
    //       history.push("/authentication");
    //     } else {
    //       localStorage.setItem("user", JSON.stringify(state.user));
    //     }
    //   }
    // }, 1000);

    // return () => clearInterval(interval);

    setTimeout(function () {
      if (state.user) {
        const decodeToken = jwtDecode(state.user.token);

        if (decodeToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("user");
          history.push("/authentication");
        } else {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    }, 1000);//1 Second

    setTimeout(function () {
      localStorage.removeItem("user");
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
