import React, { useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import { SignUp } from "../../API/AuthAPI";

const Register = ({ SetLoginOrRegister, ModalSignIn }) => {
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
          username: UsernameRef.current.value,
          password: PasswordRef.current.value,
          email: EmailRef.current.value,
          bio: BioRef.current.value,
          country: "",
        });
        if (data !== null && data !== "" && data !== undefined) {
          ModalSignIn(false);
          history.push("/home");
          console.log(data);
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
          <label htmlFor="txtEmail" className="col-auto col-form-label">
            E-mail
          </label>
          <div className="col-auto">
            <input
              type="email"
              className="form-control form-control-sm"
              required
              ref={EmailRef}
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
              ref={PasswordRef}
              required
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <label htmlFor="txtConfirmPassword" className="col-auto col-form-label">
            Confirm-Password
          </label>
          <div className="col-auto">
            <input
              type="password"
              className="form-control form-control-sm"
              ref={ConfirmPasswordRef}
              required
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <label htmlFor="txtBio" className="col-auto col-form-label">
            Bio
          </label>
          <div className="col-auto">
            <input
              type="text"
              className="form-control form-control-sm"
              ref={BioRef}
              required
            />
          </div>
        </div>
        <div className="row p-1 m-1">
          <div className="col-auto"></div>
          <div className="col-auto">
            {loading === true ? (
              <LoadingButton />
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  HandleRegister();
                }}
              >
                Register
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => SetLoginOrRegister("LOGIN")}
            >
              Already have an account ?
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
