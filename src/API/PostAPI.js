import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const GetPosts = async () => {
  try {
    return await axios.get(`${API_URI}/post/getposts`);
  } catch (error) {
    console.log(`PostAPI.GetPosts,${error}`);
  }
};

const GetPostByUserID = (data) => {
  try {
    return axios.get(`${API_URI}/post/getpostbyuserid`);
  } catch (error) {
    console.log(`PostAPI.GetPostByUserID,${error}`);
  }
};

const CreatePost = async ({ userID, message, token }) => {
  try {
    const result = await axios.post(
      `${API_URI}/post/createpost`,
      { userID: userID, message: message },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`PostAPI.CreatePost,${error}`);
  }
};

const LikePost = async ({ userID, postID, token }) => {
  try {
    const result = await axios.put(
      `${API_URI}/post/likepost`,
      { userID, postID },
      {
        headers: { jwttoken: token },
      }
    );

    return result;
  } catch (error) {
    console.log(`PostAPI.LikePost,${error}`);
  }
};

const EditPost = async ({ userID, postID, message, token }) => {
  try {
    const result = await axios.put(
      `${API_URI}/post/editpost`,
      { userID, postID, message },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`PostAPI.EditPost,${error}`);
  }
};

const DeletePost = async ({ userID, postID, token }) => {
  try {
    const result = await axios.delete(
      `${API_URI}/post/deletepost`,
      { userID, postID },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    //console.log(`PostAPI.DeletePost,${error}`);
    return error;
  }
};

export {
  GetPosts,
  CreatePost,
  LikePost,
  EditPost,
  DeletePost,
  GetPostByUserID,
};
