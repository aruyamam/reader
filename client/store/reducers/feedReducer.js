import { SET_ARTICLES, SET_CURRENT_FEED, SET_FEEDS } from '../actions/actionTypes';

const initialState = {
   currentFeed: '',
   feeds: [],
   articles: [],
};

const feedReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_CURRENT_FEED:
         return {
            ...state,
            currentFeed: action.feedId,
         };

      case SET_FEEDS:
         return {
            ...state,
            feeds: [...action.feeds],
         };

      case SET_ARTICLES:
         return {
            ...state,
            articles: [...action.articles],
         };

      default:
         return state;
   }
};

export default feedReducer;
