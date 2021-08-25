import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/js/dist/modal";
import { AuthContext } from "../../Context/AuthContext";
import * as AuthAction from "../../ActionType/AuthAction";
import brand_logo from "../../Assets/Images/social-media-128.png";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const SignOutHandle = () => {
    try {
      dispatch({ type: AuthAction.SIGNOUT, payload: user });

      history.push("/home");
    } catch (error) {
      console.log(`Error: Header.SignOutHandle(),${error}`);
    }
  };

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img
            src={brand_logo}
            alt="brand-logo"
            style={{ height: "30px", width: "30px" }}
          />
          <label htmlFor="txtUsername" className="navbar-brand mx-1">
            {user ? " Hello! " + user.username : " Social "}
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
              <Link className="btn" to={`/signin`}>
                Account
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
