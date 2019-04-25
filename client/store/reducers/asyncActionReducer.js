import {
   ASYNC_ACTION_START,
   ASYNC_ACTION_END,
   FETCH_ARTICLES_ACTION_START,
   FETCH_ARTICLES_ACTION_END,
   FETCH_FEEDS_ACTION_START,
   FETCH_FEEDS_ACTION_END,
} from '../actions/actionTypes';

const initialState = {
   fetchArticles: false,
   fetchFeeds: false,
   loading: false,
};

const asyncActionReducer = (state = initialState, action) => {
   switch (action.type) {
      case ASYNC_ACTION_START:
         return {
            ...state,
            loading: true,
         };

      case ASYNC_ACTION_END:
         return {
            ...state,
            loading: false,
         };

      case FETCH_ARTICLES_ACTION_START:
         return {
            ...state,
            fetchArticles: true,
         };

      case FETCH_ARTICLES_ACTION_END:
         return {
            ...state,
            fetchArticles: false,
         };

      case FETCH_FEEDS_ACTION_START:
         return {
            ...state,
            fetchFeeds: true,
         };

      case FETCH_FEEDS_ACTION_END:
         return {
            ...state,
            fetchFeeds: false,
         };

      default:
         return state;
   }
};

export default asyncActionReducer;
