import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserLogIn = ({ setUser }) => {
  // init states & history
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // server request
  const fetchdata = async (email, password) => {
    try {
      const response = await axios.post(
        "https://lbc-exo.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      // update user state & create cookie after answer from server
      setUser({ username: response.data.username, token: response.data.token });
      Cookies.set("UserToken", response.data.token, { expires: 3000 });

      // redirect user to home page
      history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  // handle email
  const handleEmail = (value) => {
    setEmail(value);
  };
  // handle email
  const handlePassword = (value) => {
    setPassword(value);
  };

  // handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
    } else {
      fetchdata(email, password);
    }
  };
  return (
    <>
      <section className="loginContainter">
        <h1>Connexion</h1>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label>
            Adresse email
            <input
              type="email"
              value={email}
              onChange={(event) => {
                handleEmail(event.target.value);
              }}
              required
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => {
                handlePassword(event.target.value);
              }}
              required
            />
          </label>
          <input type="submit" value="Se connecter" />
        </form>
      </section>
      <section className="noAccount">
        <h2>Vous n'avez pas de compte</h2>
        <Link to="/user/sign_up">Créer un compte</Link>
      </section>
    </>
  );
};

export default UserLogIn;
