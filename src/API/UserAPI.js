import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const GetProfile = async (userID) => {
  try {
    const result = await axios.get(`${API_URI}/user/getprofile/${userID}`);

    return result;
  } catch (error) {
    console.log(`Error: API/UserAPI/GetProfile , ${error}`);
  }
};

const EditProfile = async ({ userID, bio, country , gender , token }) => {
  try {
    const result = await axios.put(
      `${API_URI}/user/editprofile`,
      { userID, bio, country , gender },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`Error: API/UserAPI/EditProfile , ${error}`);
  }
};

const FollowUser = async ({ userID, followuserID, token }) => {
  try {
    const result = await axios.put(
      `${API_URI}/user/followuser`,
      { userID, followuserID },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`Error: API/UserAPI/FolowUser , ${error}`);
  }
};

const CloseAccount = async ({ userID, token }) => {
  try {
    const result = await axios.delete(
      `${API_URI}/user/deleteuser`,
      { userID },
      {
        headers: { jwttoken: token },
      }
    );

    return result;
  } catch (error) {
    console.log(`Error: API/UserAPI/CloseAccount , ${error}`);
  }
};

const UploadAvatar = async ({ files, userID, token }) => {
  try {
    const result = await axios.post(
      `${API_URI}/user/Upload_Avatar`,
      { files, userID },
      {
        headers: { "Content-Type": "multipart/form-data", jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`Error: API/UserAPI/UploadAvatar , ${error}`);
  }
};

export { GetProfile, EditProfile, FollowUser, CloseAccount, UploadAvatar };
