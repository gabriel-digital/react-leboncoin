import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logo, pictoPlus, pictoSearch, pictoUser } from "../pictos";

const Header = ({ user, setUser, tokenFromCookie }) => {
  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/">{logo(169, 30, "#F56B2A")}</Link>
          <button>
            {pictoPlus(23, 23, "white")}
            Déposer une annonce
          </button>
          <button>
            {pictoSearch(20, 20, "black")}
            Rechercher
          </button>
        </nav>
        {!tokenFromCookie ? (
          <Link to="/user/log_in" className="connect">
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
