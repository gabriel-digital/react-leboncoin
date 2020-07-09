import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './containers/NotFound';
import Home from './containers/Home';
import Offers from './containers/Offers';
import Offer from './containers/Offer';
import Payment from './containers/Payment';
import Publish from './containers/Publish';
import UserSignUp from './containers/UserSignUp';
import UserLogIn from './containers/UserLogIn';

import OffersState from './context/offers/OffersState';

import './App.css';

function App() {
  const tokenFromCookie = Cookies.get('UserToken');
  const userFromCookie = Cookies.get('UserName');
  const [user, setUser] = useState();
  const [prev, setPrev] = useState();

  return (
    <OffersState>
      <Router>
        <Header setUser={setUser} tokenFromCookie={tokenFromCookie} />
        <Switch>
          <Route exact path="/offer/publish">
            <Publish tokenFromCookie={tokenFromCookie} user={user} />
          </Route>
          <Route exact path="/offer/:id">
            <Offer />
          </Route>
          <Route exact path="/offers">
            <Offers />
          </Route>
          <Route exact path="/payment">
            <Payment
              tokenFromCookie={tokenFromCookie}
              userFromCookie={userFromCookie}
            />
          </Route>
          <Route exact path="/user/sign_up">
            <UserSignUp setUser={setUser} />
          </Route>
          <Route exact path="/user/log_in">
            <UserLogIn setUser={setUser} prev={prev} setPrev={setPrev} />
          </Route>
          <Route exact path="/">
            <Home user={userFromCookie} />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </OffersState>
  );
}

export default App;
