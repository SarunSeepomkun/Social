import { AUTH } from "../constant/actionType";
import * as api from "../api/authApi";

const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(`Error : authAction.signin ${error}`);
  }
};

const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(`Error : authAction.signup ${error}`);
  }
};

export { signin, signup };
