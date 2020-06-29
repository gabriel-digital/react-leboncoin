import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logo, pictoPlus, pictoSearch, pictoUser } from '../pictos';

const Header = ({ setUser, tokenFromCookie }) => {
  // get page we are on
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <header className={location === '/offers' ? 'isSearch' : ''}>
      <div className="container">
        <Link className="home" to="/">
          {logo(169, 30, '#F56B2A')}
        </Link>
        <nav>
          <Link className="publish" to="/offer/publish">
            {pictoPlus(23, 23, 'white')}
            <span>Déposer une annonce</span>
          </Link>
          <Link
            to="/offers"
            className={location === '/offers' ? 'active offers' : 'offers'}
          >
            {pictoSearch(20, 20, 'black')}
            <span>Rechercher</span>
          </Link>
        </nav>
        {!tokenFromCookie ? (
          <Link
            to="/user/log_in"
            className={
              location === '/user/log_in' ? 'connect active' : 'connect'
            }
          >
            {pictoUser(20, 20, 'black')}
            <span>Se connecter</span>
          </Link>
        ) : (
          <button
            className="connect"
            onClick={() => {
              Cookies.remove('UserToken');
              Cookies.remove('UserName');
              setUser('');
            }}
          >
            {pictoUser(20, 20, 'black')}
            <span>Se déconnecter</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
