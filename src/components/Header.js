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
        <nav>
          {/* <button className="navToggle">
            <svg width="40px" height="40px" viewBox="0 0 20 14">
              <path
                d="M1.111 14H18.89C19.5 14 20 13.475 20 12.833c0-.641-.5-1.166-1.111-1.166H1.11C.5 11.667 0 12.192 0 12.833 0 13.475.5 14 1.111 14zm0-5.833H18.89C19.5 8.167 20 7.642 20 7s-.5-1.167-1.111-1.167H1.11C.5 5.833 0 6.358 0 7s.5 1.167 1.111 1.167zM0 1.167c0 .641.5 1.166 1.111 1.166H18.89C19.5 2.333 20 1.808 20 1.167 20 .525 19.5 0 18.889 0H1.11C.5 0 0 .525 0 1.167z"
                fill="#f56b2a"
                fillRule="evenodd"
              ></path>
            </svg>
          </button> */}
          <Link className="home" to="/">
            {logo(169, 30, '#F56B2A')}
          </Link>
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
