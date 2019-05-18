import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import error from '../middleware/error';
import devBundle from '../devBundle';
import authRoutes from '../routes/authr.routes';
import feedRoutes from '../routes/feed.routes';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

devBundle.compile(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/feeds', feedRoutes);

app.use(error);

app.get('*', (req, res) => {
   res.status(200).sendFile('index.html', { root: 'dist' });
});

export default app;
