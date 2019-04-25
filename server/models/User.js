import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
   username: {
      type: String,
      trim: true,
      maxlength: 50,
      required: '名前は必須です',
   },
   email: {
      type: String,
      trim: true,
      maxlength: 255,
      // unique: 'そのメースアドレスはすでに登録されています。',
      required: 'メースアドレス必須です',
   },
   password: {
      type: String,
      required: 'パスワードは必須です',
   },
   created: {
      type: Date,
      default: Date.now,
   },
   updated: Date,
});

UserSchema.methods.generateAuthToken = function generateAuthToken() {
   const token = jwt.sign(
      {
         _id: this._id,
         username: this.username,
      },
      process.env.JWT_SECRET,
   );

   return token;
};

export default mongoose.model('User', UserSchema);
