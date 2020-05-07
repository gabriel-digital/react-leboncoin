import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section>
        <ul style={{ textAlign: "center", lineHeight: 2.5 }}>
          <li>
            <Link to="/offers/">voir les offres</Link>
          </li>
          <li>
            <Link to="/user/sign_up">créer un compte</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
