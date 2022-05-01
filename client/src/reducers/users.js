import { START_LOADING_USERS, END_LOADING_USERS, FETCH_FOLLOWINGS, UPDATE_FOLLOWINGS, FETCH_FOLLOWERS, UPDATE_FOLLOWERS, RESET_USERS } from "../constants/actionTypes";

const usersReducer = (state = { isLoading: true, followings: [], followers: [] }, action) => {
  switch (action.type) {
    case START_LOADING_USERS:
      return { ...state, isLoading: true };
    case END_LOADING_USERS:
      return { ...state, isLoading: false };
    case FETCH_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload.data
      }
    case UPDATE_FOLLOWINGS:
      return {
        ...state,
        followings: action.payload.followings,
      }
    case FETCH_FOLLOWERS:
      return {
        ...state,
        followers: action.payload.data
      }
    case UPDATE_FOLLOWERS:
      {
        return {
          ...state,
          followers: action.payload.followers
        }
      }
    case RESET_USERS:
      {
        return {
          ...state,
          followers: [],
          followings: [],
        }
      }
    default:
      return state;
  }
}

export default usersReducer;