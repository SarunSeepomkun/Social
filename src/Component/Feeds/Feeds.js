import React, { useState, useEffect } from "react";
import { GetPosts } from "../../API/PostAPI";
import Feed from "./Feed/Feed";
import { default as Loading } from "../Skeletons/Feeds/Feeds";

const Feeds = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPost() {
      const { data } = await GetPosts();
      setPosts(data);
    }
    fetchPost();
  }, []);

  return (
    <div className="container-fluid w-100 d-flex flex-column justify-content-center">
      {posts !== undefined ? (
        posts.map((data, index) => (
          <div className="container-fluid w-100 mt-3" key={index}>
            <Feed data={data} key={index} />
          </div>
        ))
      ) : (
        <div className="container-fluid">
          <div className="mt-3">
            <Loading />
          </div>
          <div className="mt-3">
            <Loading />
          </div>
          <div className="mt-3">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feeds;
