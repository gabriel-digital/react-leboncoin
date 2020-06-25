import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils';
import Loader from '../components/Loader';

const Offers = () => {
  // init states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({});

  let url = `${process.env.REACT_APP_ENV}/offers/with-count`;
  const setUrl = () => {
    if (!query.title) {
      url = `${process.env.REACT_APP_ENV}/offers/with-count`;
    } else {
      url = `${process.env.REACT_APP_ENV}/offers/with-count?title=${query.title}`;
    }
    return url;
  };

  // server request
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };
  // call server request once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    };
    fetchData();
  }, [url]);

  return loading ? (
    <main>
      <Loader />
    </main>
  ) : (
    <>
      <main className="offers">
        <section className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUrl(query);
              fetchData();
            }}
          >
            <div className="mainSearch">
              <input
                type="text"
                placeholder="Try something like 'cat', 'kitten, 'cute'"
                value={query.title}
                onChange={(event) => {
                  setQuery({ title: event.target.value });
                }}
              />
              <input type="submit" value="Rechercher" className="action" />
            </div>
            {/* <div className="filters">
              <div className="price">
                prix entre
                <input type="text" placeholder="prix min" />
                entre
                <input type="text" placeholder="prix max" />
              </div>
              <div className="sort">
                <select>
                  <option selected> tri : Plus récentes</option>
                  <option selected> tri : Plus anciennes</option>
                  <option selected> tri : Plus chères</option>
                  <option selected> tri : Moins chères</option>
                </select>
              </div>
            </div> */}
          </form>
        </section>

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
