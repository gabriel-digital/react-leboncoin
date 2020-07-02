import React, { useContext } from 'react';
import OffersContext from '../context/offers/offersContext';

const Pagination = ({ filters, page, setPage, total }) => {
  const offersContext = useContext(OffersContext);
  const onClick = (direction) => {
    let current = page;
    if (direction === 'prev') {
      current -= 1;
      setPage(current);
    }
    if (direction === 'next') {
      current += 1;
      setPage(current);
    }
    offersContext.searchOffers(current, filters);
  };
  return (
    <div className="pagination">
      {page > 1 && (
        <button
          className="prev action"
          onClick={(e) => {
            onClick('prev');
          }}
        >
          &lt; page précédente
        </button>
      )}
      {page < total && (
        <button
          className="next action"
          onClick={(e) => {
            onClick('next');
          }}
        >
          page suivante &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
