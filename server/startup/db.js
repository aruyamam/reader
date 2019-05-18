import mongoose from 'mongoose';
import logger from './logging';

const db = process.env.MONGODB_URI;

mongoose
   .set('useCreateIndex', true)
   .set('useFindAndModify', false)
   .connect(db, { useNewUrlParser: true })
   .then(() => logger.info(`Connected to ${db}`));
