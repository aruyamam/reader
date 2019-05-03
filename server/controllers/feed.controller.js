import { Types } from 'mongoose';
import RSSParser from 'rss-parser';
import Feed from '../models/Feed';
import Subscribe from '../models/Subscribe';
import Article from '../models/Article';

const fetchFeeds = async (req, res) => {
   const feeds = await Subscribe.aggregate([
      {
         $match: {
            user: Types.ObjectId(req.params.userId),
         },
      },
      {
         $lookup: {
            from: 'feeds',
            localField: 'feed',
            foreignField: '_id',
            as: 'feed',
         },
      },
      {
         $unwind: '$feed',
      },
      {
         $project: {
            _id: '$feed._id',
            updated: '$updated',
            title: '$feed.title',
            link: '$feed.link',
            feedUrl: '$feed.feedUrl',
            description: '$feed.description',
         },
      },
      // {
      //    $sort: {
      //       title: 1,
      //    },
      // },
   ]);

   feeds.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1));

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

   // すでに他人が購読していないかチェック
   const foundFeed = await Feed.findOne({ link: feed.link });

   const { items } = feed;

   // まったく誰も登録していなかった場合
   if (!foundFeed) {
      // 新しくフィードを作る
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
      // すでに本人が購読していた場合はそのフィードを返す
      const subscribedFeed = await Subscribe.findOne({
         feed: Types.ObjectId(foundFeed._id),
         user: Types.ObjectId(userId),
      })
         .populate('feed')
         .exec();

      if (subscribedFeed) {
         return res.status(200).json(subscribedFeed.feed);
      }

      // すでに他人が購読していた場合
      feed = foundFeed;
   }

   const articles = new Article({
      feedId: feed._id,
      userId,
      articles: items,
      updated: Date.now(),
   });
   await articles.save();

   const subscribe = new Subscribe({
      user: userId,
      feed: feed._id,
      updated: Date.now(),
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
   const { userId } = req.params;

   const subscribe = await Subscribe.findOneAndUpdate(
      {
         feed: Types.ObjectId(feedId),
         user: Types.ObjectId(userId),
      },
      { updated: Date.now() },
   )
      .populate('feed')
      .exec();

   const newFeed = await rssParser.parseURL(subscribe.feed.feedUrl);
   if (newFeed.errno) {
      return res.json({ error: newFeed.errno });
   }
   const { items } = newFeed;

   const [article] = await Article.find({
      feedId: Types.ObjectId(feedId),
      userId: Types.ObjectId(req.params.userId),
   }).exec();

   items
      .sort((a, b) => (new Date(a.pubDate) > new Date(b.pubDate) ? 1 : -1))
      .forEach((item) => {
         if (new Date(item.pubDate) > new Date(article.updated)) {
            article.articles.unshift(item);
         }
      });

   await Feed.findByIdAndUpdate(feedId, { updated: Date.now() });
   await Article.findOneAndUpdate(
      { _id: article._id },
      {
         articles: article.articles,
         updated: Date.now(),
      },
   );

   return res.status(200).json({ articles: article.articles, max: article.articles.length });
};

export default {
   fetchArticles,
   fetchFeeds,
   readArticle,
   subscribeFeed,
   updateArticles,
   updateFeed,
};
