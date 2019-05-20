import axios from 'axios';
import {
   SET_ARTICLES, SET_CURRENT_FEED, SET_FEEDS, ADD_ARTICLES,
} from './actionTypes';
import {
   asyncActionStart,
   asyncActionEnd,
   fetchFeedsActionEnd,
   fetchFeedsActionStart,
} from './asyncAction';
import { setError, clearError } from './errorAction';

export const findFeed = async (feedId) => {
   const res = await axios.get(`/api/feeds?id=${feedId}`);

   return res.data;
};

const addArticles = articles => ({
   type: ADD_ARTICLES,
   articles,
});

export const setFeeds = feeds => ({
   type: SET_FEEDS,
   feeds,
});

export const setCurrentFeed = feedId => ({
   type: SET_CURRENT_FEED,
   feedId,
});

const setAritcles = data => ({
   type: SET_ARTICLES,
   articles: data.articles,
   max: data.max,
});

export const subscribeFeed = (feedUrl, userId) => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const feed = await axios.post('/api/feeds', {
         feedUrl,
         userId,
      });
      dispatch(clearError());
      dispatch(asyncActionEnd());

      return feed.data;
   }
   catch (err) {
      dispatch(asyncActionEnd());
      dispatch(setError('フィードが見つかりません'));
   }
};

export const fetchFeeds = userId => async (dispatch) => {
   try {
      dispatch(fetchFeedsActionStart());
      const res = await axios.get(`/api/feeds/${userId}`);

      dispatch(setFeeds(res.data));
      dispatch(clearError());
      dispatch(fetchFeedsActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(setError(err.message));
      dispatch(fetchFeedsActionEnd());
   }
};

export const updateFeed = (userId, feedId) => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const res = await axios.post(`/api/feeds/${userId}`, { feedId });
      // console.log(res.data);
      dispatch(setAritcles(res.data));
      dispatch(clearError());
      dispatch(asyncActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(asyncActionEnd());
      dispatch(setError(err.message));
   }
};

export const fetchArticles = feedId => async (dispatch, getState) => {
   try {
      const {
         auth: { user },
         feed: { offset },
      } = getState();
      dispatch(asyncActionStart());
      const result = await axios.get(`/api/feeds/${user._id}/${feedId}/${offset}`);
      // console.log(results);
      dispatch(setAritcles(result.data));
      dispatch(setCurrentFeed(feedId));
      dispatch(clearError());
      dispatch(asyncActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(setError(err.message));
      dispatch(asyncActionEnd());
   }
};

export const updateArticles = feedId => async (dispatch, getState) => {
   try {
      const {
         auth: { user },
         feed: { count, offset },
      } = getState();

      dispatch(asyncActionStart());
      const result = await axios.post(`/api/feeds/${user._id}/${feedId}`, { count, offset });
      // console.log(result);
      dispatch(addArticles(result.data));
      dispatch(asyncActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(setError(err.message));
      dispatch(asyncActionEnd());
   }
};

export const readArticle = (feedId, article) => async (dispatch, getState) => {
   if (!article.isRead) {
      try {
         const {
            auth: { user },
            feed: { offset },
         } = getState();

         await axios.put(`/api/feeds/${user._id}/${feedId}`, {
            articleId: article._id,
            isRead: true,
         });
         const result = await axios.get(`/api/feeds/${user._id}/${feedId}/${offset}`);
         await dispatch(setAritcles(result.data));
         dispatch(setCurrentFeed(feedId));
         dispatch(clearError());
         // dispatch(fetchArticles(feedId));
      }
      catch (err) {
         console.log(err);
      }
   }
};
