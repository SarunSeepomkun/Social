import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/js/dist/modal";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";
import "./Navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const SignOutHandle = () => {
    try {
      dispatch({ type: AuthAction.SIGNOUT, payload: user });

      history.push("/authentication");
    } catch (error) {
      console.log(`Error: Header.SignOutHandle(),${error}`);
    }
  };

  return (
    <section>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <label htmlFor="txtUsername" className="navbar-brand mx-1">
            <label className="text-capitalize">
              {user ? " Hello! " + user.username : ""}
            </label>
          </label>
          <button
            className="navbar-toggler"
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
                <Link to="/home">
                  <button className="btn">Feeds</button>
                </Link>
              </li>
              <li className="nav-item">
                {user === null ? (
                  ""
                ) : (
                  <Link to={`/profile/${user.userID}`}>
                    <button className="btn">My Profile</button>
                  </Link>
                )}
              </li>
            </ul>
            {user === null ? (
              <Link className="btn" to={`/authentication`}>
                Sign in
              </Link>
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
    </section>
  );
};

export default Navbar;
