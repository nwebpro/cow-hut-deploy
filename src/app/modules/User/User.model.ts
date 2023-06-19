import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './User.interface';
import { role } from './User.constant';

const userSchema = new Schema(
	{
		name: {
			type: {
				firstName: {
					type: String,
					required: true,
				},
				middleName: {
					type: String,
				},
				lastName: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
		role: {
			type: String,
			enum: role,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			required: true,
		},
		income: {
			type: Number,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

export const User = model<IUser, UserModel>('User', userSchema);
