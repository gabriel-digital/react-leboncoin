import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="home">
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
