import mongoose from 'mongoose';
import { IOrder } from './Order.interface';
import { User } from '../User/User.model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { Order } from './Order.model';
import { Cow } from '../Cow/Cow.model';

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
	//   start session
	const session = await mongoose.startSession();
	try {
		// Start Transaction
		session.startTransaction();

		// check buyer blance
		const getCowData = await Cow.findById(order.cow);
		const buyer = await User.findById(order.buyer);
		if (!buyer || buyer.budget < (getCowData?.price as number)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds.');
		}

		// cow data update
		if (!getCowData || getCowData.label === 'sold out') {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is not available.');
		} else {
			await Cow.findByIdAndUpdate(
				{ _id: order.cow },
				{ label: 'sold out' },
				{ new: true }
			);
		}

		if (buyer.role === 'buyer') {
			const newBudgetValue = buyer.budget - getCowData.price;
			await User.findByIdAndUpdate(
				{ _id: order.buyer },
				{ budget: newBudgetValue },
				{ new: true }
			);

			const seller = await User.findById(getCowData.seller);
			const newIncome = (seller ? seller.income : 0) + getCowData.price;

			await User.findByIdAndUpdate(
				{ _id: getCowData.seller },
				{ income: newIncome },
				{ new: true }
			);
		} else {
			throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a buyer');
		}
		// buyer data update
		// if (buyer.role === 'buyer') {
		// 	const userData = await User.findById(order.buyerId);
		// 	const previousIncome = userData?.income;
		// 	const newIncome = (previousIncome as number) + getCowData.price;

		// 	await User.findByIdAndUpdate(
		// 		{ _id: order.buyerId },
		// 		{ budget: buyer.budget - getCowData.price },
		// 		{ new: true }
		// 	);
		// 	await User.findByIdAndUpdate(
		// 		{ _id: getCowData.seller },
		// 		{ income: newIncome },
		// 		{ new: true }
		// 	);
		// } else {
		// 	throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds.');
		// }

		// order create
		const result = await Order.create([order], { session });
		// Commit Transaction
		await session.commitTransaction();
		return result[0];
	} catch (error) {
		// Rollback Transaction / Abort Transaction
		await session.abortTransaction();
		// End Session
		await session.endSession();
		throw error;
	}
};

const getAllOrders = async (): Promise<IOrder[] | null> => {
	const result = await Order.find().populate('cow').populate('buyer');
	return result;
};

export const OrderService = {
	createOrder,
	getAllOrders,
};
