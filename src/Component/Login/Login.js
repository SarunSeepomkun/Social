import React, { useState, createRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SignIn } from "../../API/AuthAPI";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";
import { Link } from "react-router-dom";
import "./Login.css";
import "./js/main";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import Wave_Pic from "./img/wave.png";
import background from "./img/bg.svg";

const Login = ({ SetLoginOrRegister, ModalSignIn }) => {
  const [loading, SetLoading] = useState(false);
  const UsernameRef = createRef();
  const PasswordRef = createRef();
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar_Message, setSnackbar_Message] = useState("");

  async function HandleSignIn(e) {
    e.preventDefault();
    try {
      SetLoading(true);
      const result = await SignIn({
        username: UsernameRef.current.value,
        password: PasswordRef.current.value,
      });

      if (result != null && result !== "" && result !== undefined) {
        const { data } = result;
        dispatch({ type: AuthAction.SIGNIN, payload: data });

        history.push("/home");
        SetLoading(false);
      } else {
        setSnackbar_Message("User doesn't exist or User/password mistake");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbar_Message(`${error}`);
      setOpenSnackbar(true);
    } finally {
      SetLoading(false);
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const Snackbar_handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <div className="login-section">
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={Snackbar_handleClose}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={Snackbar_handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert onClose={Snackbar_handleClose} severity="error">
            {snackbar_Message}
          </Alert>
        </Snackbar>

        <form autoComplete="off" onSubmit={HandleSignIn}>
          <img className="login-wave" src={Wave_Pic} alt="" />
          <div className="login-container">
            <div className="login-img">
              <img src={background} alt="" />
            </div>
            <div className="login-content">
              <div className="login-form">
                <h2 className="login-title">Hello !</h2>
                <div className="login-input-div login-one">
                  <div className="login-i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="login-div">
                    <input
                      type="text"
                      className="login-input"
                      autoComplete="off"
                      placeholder="Username"
                      ref={UsernameRef}
                    />
                  </div>
                </div>
                <div className="login-input-div login-pass">
                  <div className="login-i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="login-div">
                    <input
                      type="password"
                      className="login-input"
                      autoComplete="off"
                      placeholder="Password"
                      ref={PasswordRef}
                    />
                  </div>
                </div>
                {loading === true ? (
                  <LoadingButton />
                ) : (
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                )}
                {loading === true ? (
                  ""
                ) : (
                  <Link className="btn btn-sm btn-link" to={`/signup`}>
                    Don't have an account ?
                  </Link>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
