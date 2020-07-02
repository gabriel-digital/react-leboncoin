import { SET_LOADING, SEARCH_OFFERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
