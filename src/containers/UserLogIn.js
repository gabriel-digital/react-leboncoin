import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserLogIn = ({ setUser }) => {
  // init states & history
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  // server request
  const fetchData = async (email, password) => {
    try {
      const response = await axios.post(
        "https://lbc-exo.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      // create cookie after answer from server & update user state
      Cookies.set("UserToken", response.data.token, { expires: 3000 });
      setUser({ username: response.data.username });
      // redirect user to home page
      history.push("/");
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  // handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    // check we have all rquired data
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
    }
    // everything's fine, call server request !
    else {
      fetchData(email, password);
    }
  };
  return (
    <main>
      <section className="loginContainter">
        <div className="connectForm">
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Adresse email
              <input
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
            <label>
              Mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
            <input type="submit" value="Se connecter" className="action" />
            {error && <span className="error">{error}</span>}
          </form>
        </div>
        <div className="noAccount">
          <h2>Vous n'avez pas de compte</h2>
          <Link to="/user/sign_up" className="action reverse">
            Créer un compte
          </Link>
        </div>
      </section>
    </main>
  );
};

export default UserLogIn;
