import { END_LOADING_USERS, FETCH_FOLLOWERS, FETCH_FOLLOWINGS, START_LOADING_USERS, UPDATE_FOLLOWINGS } from '../constants/actionTypes';
import * as api from '../api/index.js';



export const getFollowings = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS })
    const { data } = await api.fetchFollowings();
    dispatch({ type: FETCH_FOLLOWINGS, payload: { data } })
    dispatch({ type: END_LOADING_USERS })
  }

  catch (error) {
    console.log(error);
  }
}

export const changeFollow = (id) => async (dispatch) => {
  try {

    const { data } = await api.changeFollow(id);
    dispatch({
      // #point : Mozda treba da go promenjim
      type: UPDATE_FOLLOWINGS,
      payload: data
    });

  } catch (error) {
    console.log(error)
  }
}

export const getFollowers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_USERS })
    const { data } = await api.fetchFollowers();
    dispatch({ type: FETCH_FOLLOWERS, payload: { data } });
    dispatch({ type: END_LOADING_USERS })
  } catch (error) {
    console.log(error)
  }
}