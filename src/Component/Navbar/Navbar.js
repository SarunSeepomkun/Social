import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/js/dist/modal";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Dialog, DialogTitle, Container } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [LoginOrRegister, SetLoginOrRegister] = useState("LOGIN");
  const [ShowSignIn, SetShowSignIn] = useState(false);
  let history = useHistory();

  const handleClose = () => {
    SetShowSignIn(false);
  };

  const SignOutHandle = () => {
    try {
      dispatch({ type: AuthAction.SIGNOUT, payload: user });

      localStorage.removeItem("user");
      history.push("/home");

      console.log(user);
    } catch (error) {
      console.log(`Error: Header.SignOutHandle(),${error}`);
    }
  };

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <label htmlFor="txtUsername" className="navbar-brand">
            Social
          </label>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn" to="/home">
                  Feeds
                </Link>
              </li>
              <li className="nav-item">
                {user === null ? (
                  ""
                ) : (
                  <Link className="btn" to={`/profile/${user.userID}`}>
                    My Profile
                  </Link>
                )}
              </li>
            </ul>
            {user === null ? (
              <button className="btn" onClick={() => SetShowSignIn(true)}>
                Sign-In
              </button>
            ) : (
              ""
            )}
            {user === null ? (
              ""
            ) : (
              <button className="btn" onClick={() => SignOutHandle()}>
                Sign-Out
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* <!-- SignIn Modal --> */}
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={ShowSignIn}
        onClose={handleClose}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {LoginOrRegister === "LOGIN" ? "Sign-In" : "Sign-Up"}
        </DialogTitle>
        <Container>
          {LoginOrRegister === "LOGIN" ? (
            <Login
              SetLoginOrRegister={SetLoginOrRegister}
              ModalSignIn={SetShowSignIn}
            />
          ) : (
            <Register
              SetLoginOrRegister={SetLoginOrRegister}
              ModalSignIn={SetShowSignIn}
            />
          )}
        </Container>
      </Dialog>
    </section>
  );
};

export default Navbar;
