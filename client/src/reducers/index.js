import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import users from './users';
import countries from './countries';

export const reducers = combineReducers({ posts, auth, users, countries });
