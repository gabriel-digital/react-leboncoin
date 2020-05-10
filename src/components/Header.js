import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { logo, pictoPlus, pictoSearch, pictoUser } from "../pictos";

const Header = ({ user, setUser, tokenFromCookie, path }) => {
  const history = useHistory();
  const location = history.location.pathname;
  console.log(location);
  return (
    <header className={location === "/offers" ? "isSearch" : ""}>
      <div className="container">
        <nav>
          <Link to="/">{logo(169, 30, "#F56B2A")}</Link>
          <Link to="/">
            {pictoPlus(23, 23, "white")}
            Déposer une annonce
          </Link>
          <Link to="/offers" className={location === "/offers" ? "active" : ""}>
            {pictoSearch(20, 20, "black")}
            Rechercher
          </Link>
        </nav>
        {!tokenFromCookie ? (
          <Link
            to="/user/log_in"
            className={
              location === "/user/log_in" ? "connect active" : "connect"
            }
          >
            {pictoUser(20, 20, "black")}Se connecter
          </Link>
        ) : (
          <button
            className="connect"
            onClick={() => {
              Cookies.remove("UserToken");
              setUser("");
            }}
          >
            {pictoUser(20, 20, "black")}
            Se déconnecter
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
