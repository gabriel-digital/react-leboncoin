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
  const fetchData = async () => {
    try {
      let url = `${process.env.REACT_APP_ENV}/offers/with-count?page=${currentPage}`;

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
      console.log(currentPage);
      console.log(url);
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
            console.log(currentPage);
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
            console.log(currentPage);
          }}
        >
          page suivante &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
