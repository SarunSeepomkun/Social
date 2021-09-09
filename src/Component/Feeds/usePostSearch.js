import React, { useEffect, useState } from "react";
import { GetPostsWithPaging } from "../../API/PostAPI";

const usePostPaging = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const GetPosts = async () => {
      setLoading(true);
      setError(false);

      const data = await GetPostsWithPaging(pageNumber , 5);
      if (data) {
        if(data.data.length > 0)
        {
          setPosts(data.data);
        }
        setHasMore(data.data.length > 0);
        setLoading(false);
      }
    };
    GetPosts();
  }, [pageNumber]);

  return { loading, error, posts, hasMore };
};

export default usePostPaging;
