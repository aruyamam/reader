import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import feedReducer from './feedReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   error: errorReducer,
   feed: feedReducer,
});

export default rootReducer;
