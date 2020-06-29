import React from 'react';
import axios from 'axios';

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  query,
  setData,
  setLoading,
}) => {
  let url = `${process.env.REACT_APP_ENV}/offers/with-count?page=${currentPage}`;
  // needs to be improved & factorised with Offers/SearchBox
  const fetchData = async () => {
    try {
      if (!query.title && !query.priceMin && !query.priceMax && !query.sort) {
        console.log('a');
        url = `${process.env.REACT_APP_ENV}/offers/with-count?page=${currentPage}`;
      } else if (
        !query.title &&
        (query.priceMin || query.priceMax || query.sort)
      ) {
        console.log('b');
        url = `${process.env.REACT_APP_ENV}/offers/with-count?page=${currentPage}&priceMin=${query.priceMin}&priceMax=${query.priceMax}&sort=${query.sort}`;
      } else {
        console.log('c');
        url = `${process.env.REACT_APP_ENV}/offers/with-count?page=${currentPage}&title=${query.title}&priceMin=${query.priceMin}&priceMax=${query.priceMax}&sort=${query.sort}`;
      }
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="prev action"
          onClick={() => {
            setCurrentPage((currentPage -= 1));
            fetchData();
          }}
        >
          &lt; page précédente
        </button>
      )}
      {currentPage < totalPages && (
        <button
          className="next action"
          onClick={() => {
            setCurrentPage((currentPage += 1));
            fetchData();
          }}
        >
          page suivante &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
