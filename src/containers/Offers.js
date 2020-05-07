import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatPrice, formatDate } from "../utils";

const Offers = () => {
  // init states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // server request
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lbc-exo.herokuapp.com/offer/with-count"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // call server request once
  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <p>chargement...</p>
  ) : (
    <>
      <main>
        <section className="search">
          <form>
            <input type="text" placeholder="Que recherchez vous ?" />
            <input type="submit" value="Rechercher" />
          </form>
        </section>
        <section className="results">
          <ul className="container">
            {data.offers.map((offer, index) => {
              return (
                <li key={offer._id}>
                  <Link to={`/offer/${offer._id}`}>
                    <div className="offersContainer">
                      <span>{offer.title}</span>
                      <br />
                      <span>{formatPrice(offer.price)}</span>
                      <br />
                      <span>{formatDate(offer.created)}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <Link to="/offer/89894389483989">go to offer</Link>
    </>
  );
};

export default Offers;
