import express from 'express';
import feedCtrl from '../controllers/feed.controller';
import auth from '../middleware/auth';

const router = express.Router();

// @/api/feeds/
router.route('/').post(auth, feedCtrl.subscribeFeed);

router
   .route('/:userId')
   .get(auth, feedCtrl.fetchFeeds)
   .post(auth, feedCtrl.updateFeed);

router
   .route('/:userId/:feedId')
   .post(feedCtrl.updateArticles)
   .put(auth, feedCtrl.readArticle);

router.route('/:userId/:feedId/:offset').get(feedCtrl.fetchArticles);

export default router;
