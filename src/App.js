import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import Authentication from "./Pages/Authentication/Authentication";
import HomePage from "./Pages/HomePage/HomePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
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
          <Route path="/authentication">
              <Authentication />
          </Route>
          <Route path="/signup">
              <Register />
          </Route>
          <Route path="/profile/:userid">
              <ProfilePage />
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
