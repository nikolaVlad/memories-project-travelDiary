import * as api from '../api/index.js';
import { FETCH_FOLLOWING } from '../constants/actionTypes.js';

export const getFollowing = () => async (dispatch) => {
  const { data } = await api.getFollowing();
  dispatch({
    type: FETCH_FOLLOWING,
    payload: { data }
  });
};
