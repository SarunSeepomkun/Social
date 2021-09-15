import React, { useState, createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SignUp } from "../../API/AuthAPI";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import PasswordStrengthMeter from "../ChangePassword/PasswordStrengthMeter";

const Register = ({ setSignIn_SignUp }) => {
  const [loading, SetLoading] = useState(false);
  let history = useHistory();

  const UsernameRef = createRef();
  const EmailRef = createRef();
  const PasswordRef = createRef();
  const ConfirmPasswordRef = createRef();

  const [txtPassword, setTxtPassword] = useState("");
  const [txtConfirmPassword, setTxtConfirmPassword] = useState("");
  const [checkMatchPassword, setCheckMatchPassword] = useState("");

  const HandleRegister = async () => {
    try {
      SetLoading(true);
      if (checkMatchPassword === "") {
        const { data } = await SignUp({
          username: UsernameRef.current.value.toLowerCase(),
          password: txtPassword,
          email: EmailRef.current.value,
        });
        if (data !== null && data !== "" && data !== undefined) {
          history.push("/home");
        }
      }
      SetLoading(false);
    } catch (error) {
      console.log(`${error}`);
      SetLoading(false);
    }
  };

  useEffect(() => {
    if (txtConfirmPassword === "" || (txtPassword === txtConfirmPassword)) {
      setCheckMatchPassword("");
    } else {
      setCheckMatchPassword("Password doesn't match");
    }
  }, [txtPassword, txtConfirmPassword]);

  const LoadingButton = () => {
    return (
      <button type="submit" className="login-btn" disabled>
        <div className="spinner-grow spinner-grow-sm m-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm m-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm m-1" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </button>
    );
  };

  return (
    <form autoComplete="off">
      <FadeIn>
        <h2 className="login-title">SIGN-UP</h2>
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
              required
            />
          </div>
        </div>

        <div className="login-input-div login-one">
          <div className="login-i">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="login-div">
            <input
              type="email"
              className="login-input"
              autoComplete="off"
              placeholder="Email"
              ref={EmailRef}
              required
            />
          </div>
        </div>

        <div className="login-input-div login-pass">
          <div className="login-i">
            <i className="fas fa-key"></i>
          </div>
          <div className="login-div">
            <PasswordStrengthMeter
              ref={PasswordRef}
              value={txtPassword}
              onChange={(e) => setTxtPassword(e.target.value)}
              className="login-input"
              autoComplete="off"
              placeholder="Password"
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
              placeholder="Confirm-Password"
              ref={ConfirmPasswordRef}
              value={txtConfirmPassword}
              onChange={(e) => setTxtConfirmPassword(e.target.value)}
            />
            <label className="password-match">{checkMatchPassword}</label>
          </div>
        </div>

        {loading === true ? (
          <LoadingButton />
        ) : (
          <button
            type="button"
            className="login-btn"
            onClick={() => {
              HandleRegister();
            }}
          >
            Register
          </button>
        )}

        <Link
          className="btn btn-sm btn-link"
          onClick={() => {
            setSignIn_SignUp("signin");
          }}
        >
          Already have an account ?
        </Link>
      </FadeIn>
    </form>
  );
};

export default Register;
