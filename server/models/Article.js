import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema({
   feedId: {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   articles: [
      new Schema({
         title: String,
         link: String,
         pubDate: Date,
         content: String,
         contentSnippet: String,
         guid: String,
         isoDate: Date,
         isRead: {
            type: Boolean,
            default: false,
         },
      }),
   ],
});

export default mongoose.model('Article', ArticleSchema);
