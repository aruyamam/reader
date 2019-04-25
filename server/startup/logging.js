import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import 'express-async-errors';

const logger = createLogger({
   transports: [
      new transports.Console({
         format: format.simple(),
         level: 'info',
      }),
      new transports.File({
         filename: 'logfile.log',
         level: 'error',
      }),
      new transports.MongoDB({
         db: process.env.MONGODB_URI,
         options: { useNewUrlParser: true },
         level: 'error',
      }),
   ],
});

logger.exceptions.handle(
   new transports.File({
      filename: 'uncaughtExceptions.log',
   }),
);

export default logger;
