import React, { useState } from "react";
import "./Authentication.css";
import Login from "../../Component/Login/Login";
import Register from "../../Component/Register/Register";
import Wave_Pic from "./img/wave.png";
import background from "./img/bg.svg";

const Authentication = () => {
  
  const [SignIn_SignUp, setSignIn_SignUp] = useState("signin");

  return (
    <React.Fragment>
      <div className="login-section">
        <img className="login-wave" src={Wave_Pic} alt="" />
        <div className="login-container">
          <div className="login-img">
            <img src={background} alt="" />
          </div>
          <div className="login-content">
            <div className="login-form">
              {SignIn_SignUp === "signin" ? (
               <Login setSignIn_SignUp={setSignIn_SignUp} />
              ) : (
                <Register setSignIn_SignUp={setSignIn_SignUp} />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Authentication;
