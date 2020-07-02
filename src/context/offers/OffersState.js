import React, { useReducer } from 'react';
import axios from 'axios';
import OffersContext from './offersContext';
import OffersReducer from './offersReducer';
import { SET_LOADING, SEARCH_OFFERS } from '../types';

const OffersState = (props) => {
  const initialState = {
    offers: [],
    offer: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(OffersReducer, initialState);

  // get offers
  const getOffers = async () => {
    try {
      setLoading();
      const response = await axios.get(
        `${process.env.REACT_APP_ENV}/offers/with-count?sort=date-desc`
      );
      dispatch({
        type: SEARCH_OFFERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // search offers
  const searchOffers = async (page, filters) => {
    try {
      setLoading();
      const response = await axios.get(
        `${process.env.REACT_APP_ENV}/offers/with-count?page=${page}&title=${filters.title}&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&sort=${filters.sort}`
      );
      dispatch({
        type: SEARCH_OFFERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // get offer

  // publish offer

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <OffersContext.Provider
      value={{
        offers: state.offers,
        offer: state.offer,
        loading: state.loading,
        getOffers,
        searchOffers,
      }}
    >
      {props.children}
    </OffersContext.Provider>
  );
};

export default OffersState;
