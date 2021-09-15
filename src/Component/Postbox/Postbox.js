import React, { createRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CreatePost, GetPostByPostID } from "../../API/PostAPI";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import FadeIn from "react-fade-in";
import { FeedsContext } from "../../Context/FeedsContext";
import "./Postbox.css";

const Postbox = () => {
  const { FeedsState } = useContext(FeedsContext);
  // eslint-disable-next-line no-unused-vars
  const [FetchFeed, setFetchFeed] = FeedsState;

  const { user } = useContext(AuthContext);
  const messageRef = createRef();
  const [loading, setLoading] = useState(false);
  const [txtMessage, setTxtMessage] = useState("");
  const [textlength, setTextlength] = useState(0);
  const [btnPostAble,setbtnPostAble] = useState(false);

  const NewPost_Click = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (messageRef.current.value) {
        const result = await CreatePost({
          userID: user.userID,
          message: messageRef.current.value,
          token: user.token,
        });
        if (result.statusText === "Created") {
          const return_postID = result.data.return_postID;
          setTxtMessage("");
          const data = await GetPostByPostID(return_postID, user.token);
          setFetchFeed((prevPosts) => {
            return [...new Set([...data.data, ...prevPosts])];
          });
        }
      }
    } catch (error) {
      console.log(`Postbar.NewPost_Click,${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTextlength(txtMessage.length);
    setbtnPostAble(txtMessage.length < 1);
  }, [txtMessage]);

  const LoadingButton = () => {
    return (
      <button className="btn btn-sm btn-outline-success" type="button" disabled>
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
      <FadeIn>
        <Card style={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Link to={`/profile/${user.userID}`}>
                <Avatar
                  aria-label="avartar"
                  style={{ backgroundColor: blue[500] }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            }
            title={
              <Link to={`/profile/${user.userID}`}>
                <label className="text-capitalize">{user.username}</label>
              </Link>
            }
          />
          <CardContent>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <textarea
                    className="form-control textarea"
                    placeholder="What are you thinking ?"
                    contenteditable
                    maxLength="500"
                    onChange={(e) => setTxtMessage(e.target.value)}
                    ref={messageRef}
                    value={txtMessage}
                    row="1"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label className="form-label my-1 label-maxlength">
                    {textlength}/500
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  {loading === false ? (
                    <button
                      className="btn btn-sm btn-outline-success my-1"
                      type="submit"
                      id="btn-post"
                      disabled={btnPostAble}
                    >
                      Post
                    </button>
                  ) : (
                    <LoadingButton />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </form>
  );
};

export default Postbox;
