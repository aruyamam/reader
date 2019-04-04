import axios from 'axios';
import { SET_ARTICLES, SET_CURRENT_FEED, SET_FEEDS } from './actionTypes';

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

export const subscribeFeed = (feedUrl, userId) => async () => {
   const feed = await axios.post('/api/feeds', {
      feedUrl,
      userId,
   });

   return feed.data;
};

export const fetchFeeds = userId => async (dispatch) => {
   await axios.get(`/api/feeds/${userId}`).then((res) => {
      // console.log(res);
      dispatch(setFeeds(res.data));
   });
};

export const updateFeed = (userId, feedId) => async (dispatch) => {
   const res = await axios.post(`/api/feeds/${userId}`, { feedId });
   console.log(res.data);
   dispatch(setAritcles(res.data));
};

export const fetchArticles = feedId => async (dispach) => {
   const results = await axios.get(`/api/feeds/articles/${feedId}`);
   // console.log(results);
   await dispach(setAritcles(results.data));
   dispach(setCurrentFeed(feedId));
};

export const readArticle = (feedId, article) => async (dispatch) => {
   if (!article.isRead) {
      await axios.post(`/api/feeds/articles/${feedId}`, {
         articleId: article._id,
         isRead: true,
      });
      dispatch(fetchArticles(feedId));
   }
};
