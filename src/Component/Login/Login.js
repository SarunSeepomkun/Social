import React, { useState, createRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SignIn } from "../../API/AuthAPI";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

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
    <form autoComplete="off" onSubmit={HandleSignIn}>
      <div className="container card my-5">
        <div className="row p-1 m-1">
          <div className="col-sm-6">
            <label htmlFor="txtUsername" className="form-label">
              Username
            </label>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control form-control-sm"
              ref={UsernameRef}
              required
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <div className="col-sm-6">
            <label htmlFor="txtPassword" className="form-label">
              Password
            </label>
          </div>
          <div className="col-sm-6">
            <input
              type="password"
              className="form-control form-control-sm"
              required
              ref={PasswordRef}
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            {loading === true ? (
              <LoadingButton />
            ) : (
              <button type="submit" className="btn btn-sm btn-outline-primary">
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
    </form>
  );
};

export default Login;
