import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CowService } from './Cow.service';
import pick from '../../../shared/pick';
import { cowFilterableFields } from './Cow.constant';
import { paginationFields } from '../../../constants/pagination';
import { ICow } from './Cow.interface';

// Create Cow
const createCow = catchAsync(async (req: Request, res: Response) => {
	// Body Response
	const { ...cowData } = req.body;
	const result = await CowService.createCow(cowData);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cow created successfully',
		data: result,
	});
});

// Get All Cows
const getAllCows = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, cowFilterableFields);
	const paginationOption = pick(req.query, paginationFields);
	const result = await CowService.getAllCows(filters, paginationOption);
	sendResponse<ICow[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Cows fetched successfully',
		meta: result.meta,
		data: result.data,
	});
});

// get Single Cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await CowService.getSingleCow(id);
	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Single Cow fetched successfully',
		data: result,
	});
});

// Update Cow
const updateCow = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const updatedData = req.body;
	const result = await CowService.updateCow(id, updatedData);
	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Updated Cow successfully',
		data: result,
	});
});

// Delete Cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await CowService.deleteCow(id);
	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Deleted Cow successfully',
		data: result,
	});
});

export const CowController = {
	createCow,
	getSingleCow,
	getAllCows,
	updateCow,
	deleteCow,
};
