import mongoose, { Schema } from 'mongoose';

const ArticleSchema = new Schema({
   feedname: {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
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
