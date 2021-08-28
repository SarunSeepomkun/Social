import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./Component/Navbar/Navbar";
import Postbar from "./Component/Postbar/Postbar";
import Feeds from "./Component/Feeds/Feeds";
import Profile from "./Component/Profile/Profile";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";

function App() {
  const { user } = useContext(AuthContext);

  const HomePage = () => {
    return (
      <section className="post-body">
        <div className="container-fluid">
          <div className="row p-1 m-1">
            <div className="col-xs-12">
              {user === null ? "" : <Postbar className="p-1 m-1" />}
              <Feeds className="p-1 m-1" />
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Router exact path="/">
            <HomePage />
          </Router>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/profile/:userid">
            <Profile />
          </Route>
          <Router>
            <NotFound />
          </Router>
        </Switch>
      </Router>
    </>
  );
}

export default App;
