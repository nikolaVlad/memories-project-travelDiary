import { FETCH_FOLLOWING } from '../constants/actionTypes';

const userStore = {
  following: []
};

const userReducer = (state = userStore, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return { ...state, following: action?.payload?.data };

    default:
      return state;
  }
};

export default userReducer;
