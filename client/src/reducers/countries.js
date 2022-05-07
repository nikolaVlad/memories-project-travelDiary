import { FETCH_COUNTRIES, SET_AVALIABLE_COUNTRIES, START_LOADING_USERS } from '../constants/actionTypes';

const countriesReducer = (state = { isLoadingAll: true, countries: [], avaliableCountries: [] }, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return { ...state, countries: action.payload.data };

    case SET_AVALIABLE_COUNTRIES:
      return { ...state, avaliableCountries: action.payload.data };
    default:
      return state;
  }
};

export default countriesReducer;
