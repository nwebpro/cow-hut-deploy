import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { OrderService } from './Order.service';

// Create new order
const createOrder = catchAsync(async (req: Request, res: Response) => {
	// Body Response
	const { ...orderData } = req.body;
	const result = await OrderService.createOrder(orderData);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Order created successfully',
		data: result,
	});
});

// get all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
	const result = await OrderService.getAllOrders();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Get All Order successfully',
		data: result,
	});
});

export const OrderController = {
	createOrder,
	getAllOrders,
};
