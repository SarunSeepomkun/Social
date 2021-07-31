import * as ActionType from "../ActionType/PostAction.js";

const POST_REDUCER = (posts = [], action) => {
  switch (action.type) {
    case ActionType.GET_POSTS:
      return action.payload;
    case ActionType.LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case ActionType.CREATE_POST:
      return [...posts, action.payload];
    case ActionType.UPDATE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case ActionType.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default POST_REDUCER;
