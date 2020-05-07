import React, { useState } from "react";

const UserSignUp = () => {
  // init states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [optin, setOptin] = useState(false);

  // handle username
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  // handle email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  // handle password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // handle confirm password
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  // handle confirm password
  const handleOptin = (event) => {
    if (!optin) {
      setOptin(true);
    } else {
      setOptin(false);
    }
  };

  //handle form submit
  const handleSubmitForm = (event) => {
    event.preventDefault();
    alert(
      `All good ! \n username : ${username}\n email : ${email}\n password : ${password}\n confirmation : ${confirmPassword}\n optin : ${optin}`
    );
  };
  return (
    <>
      <section className="signupContainer">
        <div>
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
        <form
          onSubmit={(event) => {
            handleSubmitForm(event);
          }}
        >
          <h1>Créer un compte</h1>
          <label>
            Pseudo *
            <input
              required
              type="text"
              value={username}
              onChange={(event) => {
                handleUsername(event);
              }}
            />
          </label>
          <label>
            Adresse email *
            <input
              required
              type="email"
              value={email}
              onChange={(event) => {
                handleEmail(event);
              }}
            />
          </label>
          <label>
            Mot de passe *
            <input
              required
              type="password"
              value={password}
              onChange={(event) => {
                handlePassword(event);
              }}
            />
          </label>
          <label>
            Confirmer le mot de passe *
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                handleConfirmPassword(event);
              }}
            />
          </label>
          <label>
            <input
              required
              type="checkbox"
              value={optin}
              onChange={() => {
                handleOptin();
              }}
            />
            « J’accepte les Conditions Générales de Vente et  les Conditions
            Générales d’Utilisation »
          </label>
          <input type="submit" value="Créer mon compte personnel" />
        </form>
      </section>
    </>
  );
};

export default UserSignUp;
