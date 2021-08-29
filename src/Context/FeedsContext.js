import React, { createContext, useState } from "react";

const FeedsContext = createContext();
const FeedsProvider = ({ children }) => {
  const [FetchFeed, setFetchFeed] = useState(0);
  return (
    <FeedsContext.Provider value={{ FeedsState: [FetchFeed, setFetchFeed] }}>
      {children}
    </FeedsContext.Provider>
  );
};

export { FeedsContext, FeedsProvider };
