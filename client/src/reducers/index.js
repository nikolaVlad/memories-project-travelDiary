import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import users from './users'

export const reducers = combineReducers({ posts, auth, users });
