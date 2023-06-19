import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './Auth.service';

// create user
const createUser = catchAsync(async (req: Request, res: Response) => {
	// Body Response
	const { ...userData } = req.body;
	const result = await AuthService.createUser(userData);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User created successfully',
		data: result,
	});
});

export const AuthController = {
	createUser,
};
