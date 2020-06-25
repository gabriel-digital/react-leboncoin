import React from 'react';
import { Link } from 'react-router-dom';

const Home = (user) => {
  return (
    <main>
      <section className="home">
        {user.user ? (
          <h1>Bienvenue sur LeBonCoin&nbsp;{user.user}&nbsp;!</h1>
        ) : (
          <h1>Bienvenue sur LeBonCoin !</h1>
        )}

        <p>
          Réplique codée avec React et du&nbsp;
          <span role="img" aria-label="coeur">
            ❤️
          </span>
          &nbsp;pour le bootcamp LeReacteur
        </p>
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
