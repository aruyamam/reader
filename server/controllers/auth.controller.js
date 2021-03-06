import bcrypt from 'bcrypt';
import User from '../models/User';
import validate from '../helpers/validation';

const register = async (req, res) => {
   const error = validate(req.body);
   if (error) {
      return res.status(400).send(error);
   }

   let user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).json({ error: 'そのメースアドレスはすでに登録されています。' });
   }

   user = new User(req.body);
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   user = await user.save();

   const token = user.generateAuthToken();

   return res
      .status(200)
      .header('x-auth-token', token)
      .json({
         _id: user._id,
         username: user.username,
         email: user.email,
      });
};

const login = async (req, res) => {
   const rules = {
      email: {
         required: true,
         validateEmail: true,
      },
      password: {
         required: true,
      },
   };
   const error = validate(req.body, rules);
   if (error) {
      return res.status(400).send(error);
   }

   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      return res.status(401).json({ error: 'ユーザが見つかりません。' });
   }

   const validPassword = await bcrypt.compare(password, user.password);
   if (!validPassword) {
      return res.status(401).json({
         error: '不正なパスワードです。',
      });
   }

   const token = user.generateAuthToken();

   return res
      .status(200)
      .header('x-auth-token', token)
      .json({
         _id: user._id,
         username: user.username,
         email: user.email,
      });
};

export default { register, login };
