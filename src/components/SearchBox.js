import React, { useContext } from 'react';
import OffersContext from '../context/offers/offersContext';

const SearchBox = ({ filters, setFilters, page }) => {
  const offersContext = useContext(OffersContext);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!filters) {
      alert('use filter');
    } else {
      offersContext.searchOffers(page, filters);
    }
  };

  const onChange = (e, val) => {
    let obj = { ...filters };
    console.log(filters);
    switch (val) {
      case 'title':
        obj.title = e.target.value;
        break;
      case 'priceMin':
        obj.priceMin = e.target.value;
        break;
      case 'priceMax':
        obj.priceMax = e.target.value;
        break;
      case 'sort':
        obj.sort = e.target.value;
        break;

      default:
        break;
    }
    setFilters(obj);
  };
  console.log(filters);
  return (
    <section className="search">
      <form onSubmit={onSubmit}>
        <div className="mainSearch">
          <input
            type="text"
            placeholder="Try something like 'cat', 'kitten, 'cute'"
            value={filters?.title || ''}
            onChange={(e) => {
              onChange(e, 'title');
            }}
          />
          <input type="submit" value="Rechercher" className="action" />
        </div>
        <div className="filters">
          <div className="price">
            prix entre
            <input
              type="text"
              placeholder="prix min"
              value={filters?.priceMin || ''}
              onChange={(e) => {
                onChange(e, 'priceMin');
              }}
            />
            et
            <input
              type="text"
              placeholder="prix max"
              value={filters?.priceMax || ''}
              onChange={(e) => {
                onChange(e, 'priceMax');
              }}
            />
          </div>
          <div className="sort">
            <select
              value={filters?.sort || ''}
              onChange={(e) => {
                onChange(e, 'sort');
              }}
            >
              <option value="date-desc"> tri : Plus récentes</option>
              <option value="date-asc"> tri : Plus anciennes</option>
              <option value="price-desc"> tri : Plus chères</option>
              <option value="price-asc"> tri : Moins chères</option>
            </select>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBox;
