import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import OffersContext from '../context/offers/offersContext';

const Offers = () => {
  const offersContext = useContext(OffersContext);
  const { getOffers, offers, loading } = offersContext;
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    title: '',
    priceMin: 0,
    priceMax: '',
    sort: 'date-desc',
  });
  // call server request once
  useEffect(() => {
    getOffers();
    // eslint-disable-next-line
  }, []);
  console.log(offers);
  console.log('page:' + page);

  return loading ? (
    <main>
      <Loader />
    </main>
  ) : (
    <>
      <main className="offers">
        <SearchBox filters={filters} setFilters={setFilters} />

        {offers.offers?.length === 0 ? (
          <section className="noresults">
            <h2>Il n'y a pas de résultats pour votre recherche :'(</h2>
            <p>
              Essayez de taper "cat", "cute" ou "kitten" dans la barre de
              recherche
            </p>
            <img
              src="https://jeffersoncountyhumanesociety.net/wp-content/uploads/2016/08/sad-grey-cat.jpg"
              alt="chat triste car pas de résultats à la recherche"
            />
          </section>
        ) : (
          <div className="results">
            <div className="container">
              <ul>
                {offers.offers?.map((offer, index) => {
                  return (
                    <li key={offer._id}>
                      <Link to={`/offer/${offer._id}`}>
                        {offer.picture && (
                          <img
                            src={offer.picture.secure_url}
                            alt={offer.title}
                          />
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
              {offers.pages > 1 ? (
                <p className="pages">
                  {offers.total}&nbsp;résultats&nbsp;: page&nbsp;{page}
                  &nbsp;sur&nbsp;{Math.ceil(offers.total / 10)}
                </p>
              ) : (
                <p className="pages">{offers.total}&nbsp;résultats</p>
              )}
              {offers.pages > 1 && (
                <Pagination
                  filters={filters}
                  page={page}
                  setPage={setPage}
                  total={offers.pages}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Offers;
