import express from 'express';
import feedCtrl from '../controllers/feed.controller';

const router = express.Router();

// @/api/feeds/
router.route('/').post(feedCtrl.subscribeFeed);

router
   .route('/:userId')
   .get(feedCtrl.fetchFeeds)
   .post(feedCtrl.updateFeed);

router
   .route('/articles/:feedId')
   .get(feedCtrl.fetchArticles)
   .post(feedCtrl.readArticle);

export default router;
