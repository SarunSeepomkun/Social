import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({
  id,
  name,
  ref,
  value,
  ...inputProps
}) => {
  const result = zxcvbn(value);
  const num = (result.score * 100) / 4;

  const funcvisible = ()=>{
      if(value === ""){
          return "hidden";
      }
      else{
          return "visible";
      }
  }

  const createPassLabel = () => {
    switch (result.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Excellent";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (result.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changeColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  return (
    <>
      <input
        id={id}
        name={name}
        ref={ref}
        type="password"
        {...inputProps}
      />
      <div className="password-strong" style={{ visibility: funcvisible() }}>
        <div className="progress" style={{ height: "4px" }}>
          <div className="progress-bar" style={changeColor()}></div>
        </div>
        <p style={{ color: funcProgressColor(), fontSize: "10px" }}>
          {createPassLabel()}
        </p>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
