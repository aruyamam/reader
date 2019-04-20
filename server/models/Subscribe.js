import mongoose, { Schema } from 'mongoose';

const SubscribeSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   feed: {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
   },
   updated: Date,
});

export default mongoose.model('Subscribe', SubscribeSchema);
