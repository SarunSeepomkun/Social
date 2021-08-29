import React, { useContext } from "react";
import Postbox from "../../Component/Postbox/Postbox";
import Feeds from "../../Component/Feeds/Feeds";
import { AuthContext } from "../../Context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="post-body">
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
    </section>
  );
};

export default HomePage;
