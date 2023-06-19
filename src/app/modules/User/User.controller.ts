import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './User.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './User.constant';
import { UserService } from './User.service';

// Get All User
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, userFilterableFields);
	const paginationOption = pick(req.query, paginationFields);
	const result = await UserService.getAllUsers(filters, paginationOption);
	sendResponse<IUser[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User fetched successfully',
		meta: result.meta,
		data: result.data,
	});
});

// Get Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await UserService.getSingleUser(id);
	sendResponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Single User fetched successfully',
		data: result,
	});
});

// Update User
const updateUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedData = req.body;
	const result = await UserService.updateUser(id, updatedData);
	sendResponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Updated User successfully',
		data: result,
	});
});

// Delete User
const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await UserService.deleteUser(id);
	sendResponse<IUser>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Deleted User successfully',
		data: result,
	});
});

export const UserController = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
