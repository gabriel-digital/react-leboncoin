import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./containers/Home";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import UserSignUp from "./containers/UserSignUp";
import UserLogIn from "./containers/UserLogIn";

function App() {
  const tokenFromCookie = Cookies.get("UserToken");
  const [user, setUser] = useState();

  return (
    <Router>
      <Header user={user} setUser={setUser} tokenFromCookie={tokenFromCookie} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/offers">
          <Offers />
        </Route>
        <Route path="/user/sign_up">
          <UserSignUp setUser={setUser} />
        </Route>
        <Route path="/user/log_in">
          <UserLogIn setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
