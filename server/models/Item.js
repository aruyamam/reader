import mongoose, { Schema } from 'mongoose';

export const ItemSchema = new Schema({
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
});

export default mongoose.model('Item', ItemSchema);
