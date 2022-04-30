import { END_LOADING_USERS, FETCH_FOLLOWINGS, START_LOADING_USERS, UPDATE_FOLLOWINGS } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const getFollowings = () => async (dispatch) => {
  try {


    const { data } = await api.fetchFollowings();
    dispatch({ type: FETCH_FOLLOWINGS, payload: { data } })

  }

  catch (error) {
    console.log(error);
  }
}

export const changeFollow = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS })
    const { data } = await api.changeFollow(id);
    dispatch({
      type: UPDATE_FOLLOWINGS,
      payload: data
    });
    dispatch({ type: END_LOADING_USERS })
  } catch (error) {
    console.log(error)
  }
}