import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();

// Middleware
app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/', router);

// Global error handler
app.use(globalErrorHandler);

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		success: false,
		message: 'Route not found',
		errorMessages: [
			{
				path: req.originalUrl,
				message: 'Api Not Found',
			},
		],
	});
	next();
});

export default app;
