import axios from "axios";

const API_URI = process.env.REACT_APP_API_SOCIAL;

const GetPosts = async () => {
  try {
    const result = await axios.get(`${API_URI}/post/getposts`);
    return result;
  } catch (error) {
    console.log(`PostAPI.GetPosts,${error}`);
  }
};

const GetPostsWithPaging = async (pageNumber, pageLimit) => {
  try {
    pageNumber = pageNumber || 0;
    pageLimit = pageLimit || 10;
    const result = await axios.get(
      `${API_URI}/post/GetPostsWithPaging/${pageNumber}/${pageLimit}`
    );
    return result;
  } catch (error) {
    console.log(`PostAPI.GetPostsWithPaging,${error}`);
  }
};

const GetPostByPostID = async (PostID, token) => {
  try {
    const result = await axios.post(
      `${API_URI}/post/GetPostByPostID`,
      { postID : PostID },
      {
        headers: { jwttoken: token },
      }
    );
    return result;
  } catch (error) {
    console.log(`PostAPI.GetPostByPostID,${error}`);
  }
};

const GetPostByUserID = async (userID) => {
  try {
    const result = await axios.get(`${API_URI}/post/getpostbyuserid/${userID}`);
    return result;
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
    return error;
  }
};

const DeletePost = async ({ userID, postID, token }) => {
  try {
    const result = await axios.post(
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
  GetPostsWithPaging,
  GetPostByPostID
};
