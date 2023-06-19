import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './Order.interface';

const orderSchema = new Schema(
	{
		cow: {
			type: Schema.Types.ObjectId,
			ref: 'Cow',
			required: true,
		},
		buyer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
