import React,{ createRef, useContext , useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CreatePost } from "../../API/PostAPI";

const Postbar = () => {
  const { user } = useContext(AuthContext);
  const messageRef = createRef();
  const [loading,setLoading] = useState(false);
  const [txtMessage,setTxtMessage] = useState("");

  const NewPost_Click = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
     const result = await CreatePost({
        userID: user.userID,
        message: messageRef.current.value,
        token: user.token
      });
      if(result.statusText === "Created"){
        setTxtMessage("");
      }
    } catch (error) {
      console.log(`Postbar.NewPost_Click,${error}`);
    }
    finally{
      setLoading(false);
    }
  };

  const LoadingButton = () => {
    return (
      <button className="btn btn-outline-secondary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Posting...
      </button>
    );
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
          value={txtMessage}
          onChange={(e)=> setTxtMessage(e.target.value)}
          maxLength="500"
        />
        {loading === false ? <button
          className="btn btn-outline-secondary"
          type="submit"
          id="btn-post"
        >
          Post
        </button> : <LoadingButton />}
    </div>
    </form>
  );
};

export default Postbar;
