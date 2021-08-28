import React, { useContext } from "react";
import Postbox from "../../Component/Postbox/Postbox";
import Feeds from "../../Component/Feeds/Feeds";
import { AuthContext } from "../../Context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="post-body">
      <div className="container-fluid">
        <div className="row p-1 m-1">
          <div className="col-xs-12">
            {user === null ? (
              ""
            ) : (
              <div className="container-fluid postbox">
                <Postbox />
              </div>
            )}
            <div className="container-fluid feeds">
              <Feeds />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
