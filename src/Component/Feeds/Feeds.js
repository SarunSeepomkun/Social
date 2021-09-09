import React, { useState, useRef, useCallback } from "react";
import Feed from "./Feed/Feed";
import { default as Loading } from "../Skeletons/Feeds/Feeds";
import usePostPaging from "./usePostSearch";
// import { FormatColorResetRounded } from "@material-ui/icons";
// import JsonFind from "json-find";

const Feeds = ({ userID_Param }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, posts, hasMore } = usePostPaging(pageNumber);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="d-flex flex-column justify-content-center">
      {posts.length > 1 ? posts.map((data, index) => {
        if (posts.length === index + 1) {
          return (
            <div className="mt-3" ref={lastPostElementRef} key={index}>
              <Feed data={data} key={index} />
            </div>
          );
        } else {
          return (
            <div className="mt-3" key={index}>
              <Feed data={data} key={index} />
            </div>
          );
        }
      }):""}

      <div className="mt-3">{loading ? <Loading /> : ""}</div>
      <div>{error}</div>
    </div>
  );
};

export default Feeds;
