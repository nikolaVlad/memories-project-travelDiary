import { getFollowers, getFollowings } from "./users"

export const onChangeUser = (dispatch) => {
  dispatch(getFollowers());
  dispatch(getFollowings());
}
