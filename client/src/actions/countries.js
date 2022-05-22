import * as api from '../api/index.js';
import { FETCH_COUNTRIES, SET_AVALIABLE_COUNTRIES } from '../constants/actionTypes.js';

export const getCountries = () => async (dispatch) => {
  let res = [];
  const { data } = await api.fetchCountries();
  res = data.map((country) => {
    return {
      name: country.name.common,
      flag: country.flag
    };
  });

  res = res.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  dispatch({ type: FETCH_COUNTRIES, payload: { data: res } });
};

export const setAvaliableCountries = (data) => (dispatch) => {
  let res = [];
  if (data.length > 0) {
    res = data.map((element) => {
      return {
        name: element
      };
    });
  }
  dispatch({ type: SET_AVALIABLE_COUNTRIES, payload: { data: res } });
};
