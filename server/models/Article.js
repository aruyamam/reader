import mongoose, { Schema } from 'mongoose';
import { ItemSchema } from './Item';

const ArticleSchema = new Schema({
   feedId: {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   updated: Date,
   articles: [ItemSchema],
});

export default mongoose.model('Article', ArticleSchema);
