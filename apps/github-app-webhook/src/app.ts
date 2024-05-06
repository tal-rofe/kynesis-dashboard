import express, { type Request, type Response } from 'express';
import { configDotenv } from 'dotenv';

import webhookRoutes from './routes/webhook.route';

const app = express();

configDotenv();

app.use(express.json());

app.use('/api', webhookRoutes);

app.use((err: Error, _: Request, res: Response) => {
	console.error('Error status:', err);
	console.error('Error message:', err.message);
	console.error(err.stack);

	res.status(500).send('Something broke!');
});

export default app;
