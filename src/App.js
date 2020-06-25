import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './containers/Home';
import Offers from './containers/Offers';
import Offer from './containers/Offer';
import Payment from './containers/Payment';
import Publish from './containers/Publish';
import UserSignUp from './containers/UserSignUp';
import UserLogIn from './containers/UserLogIn';

function App() {
  const tokenFromCookie = Cookies.get('UserToken');
  const userFromCookie = Cookies.get('UserName');
  const [user, setUser] = useState();
  const [prev, setPrev] = useState();

  return (
    <Router>
      <Header setUser={setUser} tokenFromCookie={tokenFromCookie} />
      <Switch>
        <Route path="/offer/publish">
          <Publish tokenFromCookie={tokenFromCookie} user={user} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/offers">
          <Offers />
        </Route>
        <Route path="/payment">
          <Payment
            tokenFromCookie={tokenFromCookie}
            userFromCookie={userFromCookie}
          />
        </Route>
        <Route path="/user/sign_up">
          <UserSignUp setUser={setUser} />
        </Route>
        <Route path="/user/log_in">
          <UserLogIn setUser={setUser} prev={prev} setPrev={setPrev} />
        </Route>
        <Route path="/">
          <Home user={userFromCookie} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
