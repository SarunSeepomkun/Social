import React, { useState, createRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SignIn } from "../../API/AuthAPI";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";

const Login = ({ SetLoginOrRegister, ModalSignIn }) => {
  const [loading, SetLoading] = useState(false);
  const UsernameRef = createRef();
  const PasswordRef = createRef();
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);

  async function HandleSignIn(e) {
    e.preventDefault();
    try {
      SetLoading(true);
      const { data } = await SignIn({
        username: UsernameRef.current.value,
        password: PasswordRef.current.value,
      });

      if (data != null && data !== "" && data !== undefined) {
        //console.log(SignIn);
        dispatch({ type: AuthAction.SIGNIN, payload: data });

        history.push("/home");
        ModalSignIn(false);
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
      console.log(`Login.HandleSignIn , ${error}`);
    }
  }

  const LoadingButton = () => {
    return (
      <button className="btn btn-outline-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    );
  };

  return (
    <form autoComplete="off" onSubmit={HandleSignIn}>
      <div className="container-fluid p-1 m-1">
        <div className="row p-1 m-1">
          <label htmlFor="txtUsername" className="col-auto col-form-label">
            Username
          </label>
          <div className="col-auto">
            <input
              type="text"
              className="form-control form-control-sm"
              ref={UsernameRef}
              required
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <label htmlFor="txtPassword" className="col-auto col-form-label">
            Password
          </label>
          <div className="col-auto">
            <input
              type="password"
              className="form-control form-control-sm"
              required
              ref={PasswordRef}
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <div className="col-auto"></div>
          <div className="col-auto">
            {loading === true ? (
              <LoadingButton />
            ) : (
              <button type="submit" className="btn btn-sm btn-outline-primary">
                Login
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => SetLoginOrRegister("REGISTER")}
            >
              Don't have an account ?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
