import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const SignIn = (data) => {
  try {
    return axios.post(`${API_URI}/user/signin`, data);
  } catch (error) {
    console.log(`authApi.SignIn,${error}`);
  }
};

const SignUp = (data) => {
  try {
    return axios.post(`${API_URI}/user/signup`, data);
  } catch (error) {
    console.log(`authApi.SignUp,${error}`);
  }
};

export { SignIn, SignUp };
