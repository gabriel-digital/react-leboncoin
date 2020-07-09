import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <section className="home">
        <h1>Page non trouvée :'(</h1>

        <Link to="/offers" className="action">
          Voir toutes les offres
        </Link>
        <Link to="/" className="action reverse">
          Retour à l'acceuil
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
