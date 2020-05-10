import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const UserSignUp = ({ setUser }) => {
  // init states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [optin, setOptin] = useState(false);
  const history = useHistory();

  // server request
  const fetchData = async (username, email, password) => {
    try {
      const response = await axios.post(
        "https://lbc-exo.herokuapp.com/user/sign_up",
        {
          username: username,
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

  //handle form submit
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // check we ahve all data needed & correct
    if (!username || !email || !password || !confirmPassword) {
      setError("tous les champs sont obligatoires");
    } else if (password !== confirmPassword) {
      setError("les mots de passe ne sont pas identiques");
    } else if (!optin) {
      setError(
        "Veuillez accepter les Conditions Générales de Ventes et les Conditions Générales d'Utilisation"
      );
    }
    // everything's fine, call server request !
    else {
      fetchData(username, email, password);
    }
  };
  return (
    <main>
      <section className="signupContainer">
        <div className="whySignup">
          <span>Pourquoi créer un compte ?</span>
          <ul>
            <li>
              <span>Gagnez du temps </span>Publiez vos annonces rapidement, avec
              vos informations pré-remplies chaque fois que vous souhaitez
              déposer une nouvelle annonce.
            </li>
            <li>
              <span>Soyez les premiers informés</span>Créez des alertes Immo ou
              Emploi et ne manquez jamais l’annonce qui vous intéresse.
            </li>
            <li>
              <span>Visibilité</span>Suivez les statistiques de vos annonces
              (nombre de fois où votre annonce a été vue, nombre de contacts
              reçus).
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmitForm}>
          <h1>Créer un compte</h1>
          <label>
            Username *
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </label>
          <label>
            Email *
            <input
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <label>
            Mot de passe *
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <label>
            Confirmer le mot de passe *
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              value={optin}
              onChange={() => {
                setOptin(!optin);
              }}
            />
            « J’accepte les <strong>Conditions Générales de Vente</strong> et{" "}
            <strong>les Conditions Générales d’Utilisation</strong> »
          </label>
          {error && <span className="error">{error}</span>}
          <input
            type="submit"
            value="Créer mon compte personnel"
            className="action"
          />
        </form>
      </section>
    </main>
  );
};

export default UserSignUp;
