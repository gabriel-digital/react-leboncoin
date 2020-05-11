import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="home">
        <h1>Bienvenue sur leboncoin !</h1>
        <p>Réplique codée avec React et du ❤️ pour le bootcamp LeReacteur</p>
        <Link to="/offers/" className="action">
          Voir toutes les offres
        </Link>
        <Link to="/user/sign_up" className="action reverse">
          Créer un compte
        </Link>
      </section>
    </main>
  );
};

export default Home;
