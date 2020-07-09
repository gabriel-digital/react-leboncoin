import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils';
import Loader from '../components/Loader';
import { pictoShoppingCart } from '../pictos';
import NotFound from './NotFound';

const Offer = () => {
  // init states & get params from url
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  const history = useHistory();
  // call server request once
  useEffect(() => {
    // server request
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ENV}/offer/${id}`
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        seterror(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return loading ? (
    <main>
      <Loader />
    </main>
  ) : error ? (
    <NotFound />
  ) : (
    <>
      <div className="container result">
        <main>
          <section>
            <div className="offerContainer">
              {data.picture && (
                <img src={data.picture.secure_url} alt={data.title} />
              )}
              <div className="offerInfo">
                <h1>{data.title}</h1>
                <span>{data.price}&nbsp;€</span>
                <span>{formatDate(data.created)}</span>
              </div>
            </div>
          </section>
          <div className="offerDescription">
            <h2>Description</h2>
            <p>{data.description}</p>
          </div>
        </main>
        <aside>
          <section className="userContainer">
            <h2>{data.creator.account.username}</h2>
            <span>17 annonces en ligne</span>
            <hr />
            <button
              onClick={() =>
                history.push('/payment', {
                  productId: data._id,
                  img: data.picture.secure_url,
                  title: data.title,
                  price: data.price,
                })
              }
            >
              {pictoShoppingCart(24, 24, 'white')}
              Acheter
            </button>
          </section>
        </aside>
      </div>
    </>
  );
};

export default Offer;
