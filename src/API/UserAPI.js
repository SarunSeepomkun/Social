import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const GetProfile = (userID) => {
  try {
    return axios.get(`${API_URI}/user/getprofile/${userID}`);
  } catch (error) {
    console.log(`Error: API/UserAPI/GetProfile , ${error}`);
  }
};

const EditProfile = ({ userID, bio, country, token }) => {
  try {
    return axios.put(
      `${API_URI}/user/editprofile`,
      { userID, bio, country },
      {
        headers: { jwttoken: token },
      }
    );
  } catch (error) {
    console.log(`Error: API/UserAPI/EditProfile , ${error}`);
  }
};

const FolowUser = ({ userID, followuserID, token }) => {
  try {
    return axios.put(
      `${API_URI}/user/followuser`,
      { userID, followuserID },
      {
        headers: { jwttoken: token },
      }
    );
  } catch (error) {
    console.log(`Error: API/UserAPI/FolowUser , ${error}`);
  }
};

const CloseAccount = ({ userID, token }) => {
  try {
    return axios.delete(
      `${API_URI}/user/deleteuser`,
      { userID },
      {
        headers: { jwttoken: token },
      }
    );
  } catch (error) {
    console.log(`Error: API/UserAPI/CloseAccount , ${error}`);
  }
};

export { GetProfile, EditProfile, FolowUser, CloseAccount };
