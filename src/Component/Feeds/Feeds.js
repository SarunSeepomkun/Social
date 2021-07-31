import React, { useState, useEffect } from "react";
import { GetPosts } from "../../API/PostAPI";
import Feed from "./Feed/Feed";

const Feeds = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPost() {
      const { data } = await GetPosts();
      setPosts(data);
    }
    fetchPost();
  }, []);

  const Loading = () => {
    return (
      <button className="btn btn-outline-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    );
  };

  return (
    <div>
      {posts !== undefined ? (
        posts.map((data, index) => (
          <div className="d-flex justify-content-center mt-3">
            <Feed data={data} key={index} />
          </div>
        ))
      ) : (
        <Loading className="justify-content-center" />
      )}
    </div>
  );
};

export default Feeds;
