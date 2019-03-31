import logger from '../startup/logging';

export default (err, req, res, next) => {
   logger.error({
      message: err.message,
      meta: err,
   });

   res.status(500).send('Someting failed.');
};
