import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_POSTS,
  LIKE,
} from "../constant/actionType";
import * as api from "../api/postApi";

const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    console.log(`Error : postAction.getPosts ${error}`);
  }
};

const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(`Error : postAction.createPost ${error}`);
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(`Error : postAction.updatePost ${error}`);
  }
};

const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(`Error : postAction.likePost ${error}`);
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(`Error : postAction.deletePost ${error}`);
  }
};

export { getPosts, createPost, updatePost, likePost, deletePost };
