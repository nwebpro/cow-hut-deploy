import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './Cow.interface';
import { category, label, location } from './Cow.constant';

const cowSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		location: {
			type: String,
			required: true,
			enum: location,
		},
		breed: {
			type: String,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
		},
		label: {
			type: String,
			enum: label,
		},
		category: {
			type: String,
			required: true,
			enum: category,
		},
		seller: {
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

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
