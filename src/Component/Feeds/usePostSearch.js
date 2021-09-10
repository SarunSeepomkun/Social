import { useEffect, useState } from "react";
import { GetPostsWithPaging } from "../../API/PostAPI";

const usePostPaging = (pageNumber, pageLimit) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const GetPosts = async () => {
      setLoading(true);
      setError(false);

      const data = await GetPostsWithPaging(pageNumber, pageLimit);
      if (data) {
        setPosts((prevPosts) => {
          return [...new Set([...prevPosts, ...data.data])];
        });
        setHasMore(data.data.length > 0);
        setLoading(false);
      }
    };
    GetPosts();
  }, [pageNumber, pageLimit]);

  return { loading, error, posts, hasMore };
};

export default usePostPaging;
