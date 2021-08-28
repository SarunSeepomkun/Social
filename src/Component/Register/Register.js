import React, { useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { SignUp } from "../../API/AuthAPI";
import { Link } from "react-router-dom";
import FadeIn from 'react-fade-in';

const Register = ({ setSignIn_SignUp }) => {
  const [loading, SetLoading] = useState(false);
  let history = useHistory();
  const UsernameRef = createRef();
  const EmailRef = createRef();
  const PasswordRef = createRef();
  const ConfirmPasswordRef = createRef();
  const BioRef = createRef();

  const HandleRegister = async () => {
    try {
      SetLoading(true);
      if (PasswordRef.current.value === ConfirmPasswordRef.current.value) {
        const { data } = await SignUp({
          username: UsernameRef.current.value.toLowerCase(),
          password: PasswordRef.current.value,
          email: EmailRef.current.value,
          bio: BioRef.current.value,
          country: "",
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
          <input
            type="password"
            className="login-input"
            autoComplete="off"
            placeholder="Password"
            ref={PasswordRef}
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
          />
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
