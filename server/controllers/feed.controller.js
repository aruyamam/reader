import { Types } from 'mongoose';
import RSSParser from 'rss-parser';
import Feed from '../models/Feed';
import Subscribe from '../models/Subscribe';
import Article from '../models/Article';

const fetchFeeds = async (req, res) => {
   const feeds = await Subscribe.find({ user: Types.ObjectId(req.params.userId) })
      .populate('feed')
      .select('feed')
      .exec();

   feeds.sort((a, b) => (a.feed.title.toUpperCase() < b.feed.title.toUpperCase() ? -1 : 1));

   return res.json(feeds);
};

const fetchArticles = async (req, res) => {
   const data = await Article.find({
      feedname: Types.ObjectId(req.params.feedId),
   }).exec();

   return res.status(200).json(data[0].articles);
};

const subscribeFeed = async (req, res) => {
   const rssParser = new RSSParser();
   const { feedUrl, userId } = req.body;

   let feed = await rssParser.parseURL(feedUrl);
   if (feed.errno) {
      return res.json({ error: feed.errno });
   }
   const { items } = feed;

   feed = new Feed({
      title: feed.title,
      link: feed.link,
      description: feed.description,
      icon: feed.image ? feed.image.link : '',
   });
   feed = await feed.save();

   const subscribe = new Subscribe({
      user: userId,
      feed: feed._id,
   });
   await subscribe.save();

   const articles = new Article({
      feedname: feed._id,
      articles: items,
   });
   await articles.save();

   return res.status(200).json(feed);
};

const readArticle = async (req, res) => {
   const { feedId } = req.params;
   const { articleId, isRead } = req.body;

   console.log(feedId, articleId, isRead);

   const article = await Article.findOneAndUpdate(
      {
         feedname: feedId,
         'articles._id': articleId,
      },
      {
         $set: {
            'articles.$.isRead': isRead,
         },
      },
   );

   res.status(200).json(article);
};

const updateFeed = async (req, res) => {
   console.log('update');
   const rssParser = new RSSParser();
   const { feedUrl, feedId, userId } = req.body;
   console.log(feedId);

   const feed = await Feed.find({ _id: feedId });

   const newFeed = await rssParser.parseURL(feedUrl);
   if (newFeed.errno) {
      return res.json({ error: newFeed.errno });
   }
   const { items } = newFeed;

   return res.status(200).json(feed);
};

export default {
   fetchArticles,
   fetchFeeds,
   readArticle,
   subscribeFeed,
   updateFeed,
};
