import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const GetPosts = async () => {
  return await axios.get(`${API_URI}/post/getposts`);
};

const GetPostByUserID = (data) => {
  return axios.get(`${API_URI}/post/getpostbyuserid`);
};

const CreatePost = ({ userID, message, token }) => {
  return axios.post(
    `${API_URI}/post/createpost`,
    { userID: userID, message: message },
    {
      headers: { "jwttoken" : token },
    }
  );
};

const LikePost = (data) => {
  return axios.put(`${API_URI}/post/likepost`, data);
};

const EditPost = (data) => {
  return axios.put(`${API_URI}/post/editpost`, data);
};

const DeletePost = (data) => {
  return axios.delete(`${API_URI}/post/deletepost`, data);
};

export {
  GetPosts,
  CreatePost,
  LikePost,
  EditPost,
  DeletePost,
  GetPostByUserID,
};
