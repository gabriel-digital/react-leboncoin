import React, { useState } from "react";

const UserSignUp = () => {
  // init states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [optin, setOptin] = useState(false);

  //handle form submit
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("tous les champs sont obligatoires");
    } else if (password !== confirmPassword) {
      setError("les mots de passe ne sont pas identiques");
    } else if (!optin) {
      setError(
        "Veuillez accepter les Conditions Générales de Ventes et les Conditions Générales d'Utilisation"
      );
    } else {
      alert(
        `All good ! \n username : ${username}\n email : ${email}\n password : ${password}\n confirmation : ${confirmPassword}\n optin : ${optin}`
      );
    }
  };
  return (
    <section className="signupContainer">
      <div>
        <span>Pourquoi créer un compte ?</span>
        <ul>
          <li>
            <span>Gagnez du temps </span>Publiez vos annonces rapidement, avec
            vos informations pré-remplies chaque fois que vous souhaitez déposer
            une nouvelle annonce.
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
          « J’accepte les Conditions Générales de Vente et  les Conditions
          Générales d’Utilisation »
        </label>
        {error && <span className="error">{error}</span>}
        <input
          type="submit"
          value="Créer mon compte personnel"
          className="action"
        />
      </form>
    </section>
  );
};

export default UserSignUp;
