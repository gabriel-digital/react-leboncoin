import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        <Link to="/offers/">go to offers</Link>
        <br />
        <Link to="/offer/toto">go to offer</Link>
      </main>
    </>
  );
};

export default Home;
