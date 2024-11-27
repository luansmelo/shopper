import { Express } from 'express';
import { corsMiddleware } from '../middlewares/cors';

export default (app: Express): void => {
	app.use(corsMiddleware);
};