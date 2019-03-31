import app from './startup/express';
import logger from './startup/logging';

import('./startup/db');
import('./startup/logging');

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server Listening on port ${port}...`));
