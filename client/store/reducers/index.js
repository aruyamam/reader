import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import feedReducer from './feedReducer';
import asyncActionReducer from './asyncActionReducer';

const rootReducer = combineReducers({
   async: asyncActionReducer,
   auth: authReducer,
   error: errorReducer,
   feed: feedReducer,
});

export default rootReducer;
