import React, { useContext } from "react";
import Postbox from "../../Component/Postbox/Postbox";
import Feeds from "../../Component/Feeds/Feeds";
import { AuthContext } from "../../Context/AuthContext";
import { FeedsProvider } from "../../Context/FeedsContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="post-body">
      <FeedsProvider>
        <div className="d-flex flex-column align-items-center">
          {user === null ? (
            ""
          ) : (
            <div className="postbox">
              <Postbox />
            </div>
          )}
          <div className="feeds">
            <Feeds />
          </div>
        </div>
      </FeedsProvider>
    </section>
  );
};

export default HomePage;
