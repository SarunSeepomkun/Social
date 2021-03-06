import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  // useEffect,
} from "react";
import Feed from "./Feed/Feed";
import Loading from "../Loading/Loading";
import usePostPaging from "./usePostSearch";
import { FeedsContext } from "../../Context/FeedsContext";
// import { CreatePost } from "../../API/PostAPI";
// import { FormatColorResetRounded } from "@material-ui/icons";
// import JsonFind from "json-find";

const Feeds = ({ userID_Param }) => {
  const { FeedsState } = useContext(FeedsContext);
  const [FetchFeed, setFetchFeed] = FeedsState;

  const pageLimit = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, posts, hasMore } = usePostPaging(
    pageNumber,
    pageLimit
  );

  setFetchFeed(posts);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className="d-flex flex-column justify-content-center">
      {FetchFeed.map((data, index) => {
        if (FetchFeed.length === index + 1) {
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
      })}
      <div className="mt-3">{loading ? <Loading /> : ""}</div>
      <div>{error}</div>
    </div>
  );
};

export default Feeds;
