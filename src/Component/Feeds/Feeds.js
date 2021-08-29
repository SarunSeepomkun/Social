import React, { useState, useEffect , useContext } from "react";
import { GetPosts, GetPostByUserID } from "../../API/PostAPI";
import Feed from "./Feed/Feed";
import { default as Loading } from "../Skeletons/Feeds/Feeds";
import { FeedsContext } from "../../Context/FeedsContext";
// import JsonFind from "json-find";

const Feeds = ({ userID_Param }) => {
  const [posts, setPosts] = useState();
  const { FeedsState } = useContext(FeedsContext);
  const [FetchFeed] = FeedsState;

  useEffect(() => {
    async function fetchPost() {
      if (userID_Param) {
        setPosts();
        const userID = userID_Param;
        const { data } = await GetPostByUserID(userID);
        if (data) {
          //const doc = JsonFind(data);
          //const result = doc.findValues("userID", userID);
          setPosts(data);
        }
      } else {
        setPosts();
        const { data } = await GetPosts();
        if (data) {
          setPosts(data);
        }
      }
    }
    fetchPost();

  }, [FetchFeed,userID_Param]);

  return (
    <div className="d-flex flex-column justify-content-center">
      {posts !== undefined ? (
        posts.map((data, index) => (
          <div className="mt-3" key={index}>
            <Feed data={data} key={index} />
          </div>
        ))
      ) : (
        <div>
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
