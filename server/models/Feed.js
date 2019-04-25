import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   link: {
      type: String,
      required: true,
      unique: true,
   },
   description: {
      type: String,
   },
   feedUrl: {
      type: String,
   },
   icon: {
      type: String,
   },
});

export default mongoose.model('Feed', FeedSchema);
