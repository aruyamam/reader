import {
   ADD_ARTICLES, SET_ARTICLES, SET_CURRENT_FEED, SET_FEEDS,
} from '../actions/actionTypes';

const initialState = {
   currentFeed: '',
   feeds: [],
   articles: [],
   max: 0,
   count: 0,
   offset: 15,
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
            max: action.max,
            count: 1,
         };

      case ADD_ARTICLES:
         return {
            ...state,
            articles: [...state.articles, ...action.articles],
            count: state.count + 1,
         };

      default:
         return state;
   }
};

export default feedReducer;
