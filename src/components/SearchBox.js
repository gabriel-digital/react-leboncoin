import React from "react";

const SearchBox = ({ query, setQuery }) => {
  return (
    <section className="search">
      <form>
        <div className="mainSearch">
          <input
            type="text"
            placeholder="Try something like 'cat', 'kitten, 'cut'..."
          />
          <input type="submit" value="Rechercher" className="action" />
        </div>
        <div className="filters">
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
        </div>
      </form>
    </section>
  );
};

export default SearchBox;
