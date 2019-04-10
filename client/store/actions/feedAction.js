import axios from 'axios';
import { SET_ARTICLES, SET_CURRENT_FEED, SET_FEEDS } from './actionTypes';
import { asyncActionStart, asyncActionEnd } from './asyncAction';
import { setError, clearError } from './errorAction';

export const setFeeds = feeds => ({
   type: SET_FEEDS,
   feeds,
});

export const setCurrentFeed = feedId => ({
   type: SET_CURRENT_FEED,
   feedId,
});

const setAritcles = articles => ({
   type: SET_ARTICLES,
   articles,
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
      console.log(err);
      dispatch(asyncActionEnd());
      dispatch(setError(err.message));
   }
};

export const fetchFeeds = userId => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const res = await axios.get(`/api/feeds/${userId}`);
      dispatch(setFeeds(res.data));
      dispatch(clearError());
      dispatch(asyncActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(asyncActionEnd());
      dispatch(setError(err.message));
   }
};

export const updateFeed = (userId, feedId) => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const res = await axios.post(`/api/feeds/${userId}`, { feedId });
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
      const { user } = getState().auth;
      dispatch(asyncActionStart());
      const results = await axios.get(`/api/feeds/${user._id}/${feedId}`);
      // console.log(results);
      await dispatch(setAritcles(results.data));
      dispatch(setCurrentFeed(feedId));
      dispatch(clearError());
      dispatch(asyncActionEnd());
   }
   catch (err) {
      console.log(err);
      dispatch(asyncActionEnd());
      dispatch(setError(err.message));
   }
};

export const readArticle = (feedId, article) => async (dispatch, getState) => {
   if (!article.isRead) {
      try {
         const { user } = getState().auth;
         await axios.post(`/api/feeds/${user._id}/${feedId}`, {
            articleId: article._id,
            isRead: true,
         });
         const results = await axios.get(`/api/feeds/${user._id}/${feedId}`);
         await dispatch(setAritcles(results.data));
         dispatch(setCurrentFeed(feedId));
         dispatch(clearError());
         // dispatch(fetchArticles(feedId));
      }
      catch (err) {
         console.log(err);
      }
   }
};
