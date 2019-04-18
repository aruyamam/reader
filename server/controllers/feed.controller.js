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
   const { offset } = req.params;
   const data = await Article.find({
      feedId: Types.ObjectId(req.params.feedId),
      userId: Types.ObjectId(req.params.userId),
   }).exec();

   const max = data[0].articles.length;

   // return res.status(200).json(data[0].articles);
   return res.status(200).json({
      articles: data[0].articles.splice(0, offset),
      max,
   });
};

const updateArticles = async (req, res) => {
   const { count, offset } = req.body;

   const articles = await Article.aggregate([
      {
         $match: {
            feedId: Types.ObjectId(req.params.feedId),
            userId: Types.ObjectId(req.params.userId),
         },
      },
      {
         $unwind: '$articles',
      },
      {
         $skip: offset * count,
      },
      {
         $limit: offset,
      },
      {
         $project: {
            isRead: '$articles.isRead',
            _id: '$articles._id',
            content: '$articles.content',
            title: '$articles.title',
            link: '$articles.link',
            pubDate: '$articles.pubDate',
            guid: '$articles.guid',
            isoDate: '$articles.isoDate',
         },
      },
   ]);

   return res.status(200).json(articles);
};

const subscribeFeed = async (req, res) => {
   const rssParser = new RSSParser();
   const { feedUrl, userId } = req.body;

   let feed = await rssParser.parseURL(feedUrl);
   if (feed.errno) {
      return res.json({ error: feed.errno });
   }

   const foundFeed = await Feed.findOne({ link: feed.link });

   const { items } = feed;

   if (!foundFeed) {
      feed = new Feed({
         title: feed.title,
         link: feed.link,
         feedUrl,
         description: feed.description,
         icon: feed.image ? feed.image.link : '',
      });
      feed = await feed.save();
   }
   else {
      feed = foundFeed;
   }

   const articles = new Article({
      feedId: feed._id,
      userId,
      articles: items,
   });
   await articles.save();

   const subscribe = new Subscribe({
      user: userId,
      feed: feed._id,
   });
   await subscribe.save();

   return res.status(200).json(feed);
};

const readArticle = async (req, res) => {
   const { feedId, userId } = req.params;
   const { articleId, isRead } = req.body;

   // console.log(feedId, articleId, isRead);

   const article = await Article.findOneAndUpdate(
      {
         feedId,
         userId,
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
   const rssParser = new RSSParser();
   const { feedId } = req.body;

   const feed = await Feed.findById(feedId);

   const newFeed = await rssParser.parseURL(feed.feedUrl);
   if (newFeed.errno) {
      return res.json({ error: newFeed.errno });
   }
   const { items } = newFeed;

   const articles = await Article.find({
      feedId: Types.ObjectId(feedId),
      userId: Types.ObjectId(req.params.userId),
   }).exec();

   items
      .sort((a, b) => (new Date(a.pubDate) > new Date(b.pubDate) ? 1 : -1))
      .forEach((item) => {
         if (new Date(item.pubDate) > new Date(feed.updated)) {
            articles[0].articles.unshift(item);
         }
      });

   await Feed.findByIdAndUpdate(feedId, { updated: Date.now() });
   const newArticles = await Article.findOneAndUpdate(
      { _id: articles[0]._id },
      { articles: articles[0].articles },
   );

   return res
      .status(200)
      .json({ articles: articles[0].articles, max: articles[0].articles.length });
};

export default {
   fetchArticles,
   fetchFeeds,
   readArticle,
   subscribeFeed,
   updateArticles,
   updateFeed,
};
