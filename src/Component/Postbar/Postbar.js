import React,{ createRef, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CreatePost } from "../../API/PostAPI";

const Postbar = () => {
  const { user } = useContext(AuthContext);
  const messageRef = createRef();

  const NewPost_Click = async (e) => {
    e.preventDefault();
    try {
      await CreatePost({
        userID: user.userID,
        message: messageRef.current.value,
        token: user.token
      });
    } catch (error) {
      console.log(`Postbar.NewPost_Click,${error}`);
    }
  };

  return (
      <form onSubmit={NewPost_Click} autoComplete="off">
        <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Say some thing..."
          aria-label="post"
          aria-describedby="btn-post"
          ref={messageRef}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="btn-post"
        >
          Post
        </button>
    </div>
    </form>
  );
};

export default Postbar;
