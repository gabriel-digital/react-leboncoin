import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';

const Offers = () => {
  // init states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({});

  // server request

  // call server request once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ENV}/offers/with-count`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <main>
      <Loader />
    </main>
  ) : (
    <>
      <main className="offers">
        <SearchBox
          setLoading={setLoading}
          setData={setData}
          query={query}
          setQuery={setQuery}
        />

        {data.offers.length === 0 ? (
          <section className="noresults">
            <img
              src="https://jeffersoncountyhumanesociety.net/wp-content/uploads/2016/08/sad-grey-cat.jpg"
              alt="chat triste car pas de résultats à la recherche"
            />
            <h2>Il n'y a pas de résultats pour votre recherche :'(</h2>
            <p>
              Essayez de taper "cat", "cute" ou "kitten" dans la barre de
              recherche
            </p>
          </section>
        ) : (
          <div className="results">
            <ul className="container">
              {data.offers.map((offer, index) => {
                return (
                  <li key={offer._id}>
                    <Link to={`/offer/${offer._id}`}>
                      {offer.picture && (
                        <img src={offer.picture.secure_url} alt={offer.title} />
                      )}
                      <div className="offersContainer">
                        <span>{offer.title}</span>
                        <br />
                        <span>{offer.price.toFixed(0)}&nbsp;€</span>
                        <br />
                        <span>{formatDate(offer.created)}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </>
  );
};

export default Offers;
