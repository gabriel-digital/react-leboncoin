import React from 'react';
import axios from 'axios';

const SearchBox = ({ setData, setLoading, query, setQuery }) => {
  let url = `${process.env.REACT_APP_ENV}/offers/with-count`;
  const setUrl = () => {
    if (!query.title) {
      url = `${process.env.REACT_APP_ENV}/offers/with-count`;
    } else {
      url = `${process.env.REACT_APP_ENV}/offers/with-count?title=${query.title}&priceMin=${query.priceMin}&priceMax=${query.priceMax}&sort=${query.sort}`;
    }
    return url;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error.message);
    }
  };
  return (
    <section className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(query);
          console.log(query);
          console.log(url);
          fetchData();
        }}
      >
        <div className="mainSearch">
          <input
            type="text"
            placeholder="Try something like 'cat', 'kitten, 'cute'"
            value={query.title}
            onChange={(event) => {
              const obj = { ...query };
              obj.title = event.target.value;
              setQuery(obj);
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
              value={query.priceMin}
              onChange={(event) => {
                const obj = { ...query };
                obj.priceMin = event.target.value;
                setQuery(obj);
              }}
            />
            entre
            <input
              type="text"
              placeholder="prix max"
              value={query.priceMax}
              onChange={(event) => {
                const obj = { ...query };
                obj.priceMax = event.target.value;
                setQuery(obj);
              }}
            />
          </div>
          <div className="sort">
            <select
              onChange={(event) => {
                const obj = { ...query };
                obj.sort = event.target.value;
                setQuery(obj);
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
