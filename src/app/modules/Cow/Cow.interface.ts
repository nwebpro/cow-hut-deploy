import { Model, Types } from 'mongoose';
import { IUser } from '../User/User.interface';

export interface ICowFilters {
	searchTerm?: string;
	id?: string;
	name?: string;
	category?: string;
	location?: string;
	breed?: string;
	age?: number;
	price?: string;
	weight?: string;
	label?: string;
}

export interface ICow {
	name: string;
	age: number;
	price: number;
	location:
		| 'Dhaka'
		| 'Chittagong'
		| 'Rajshahi'
		| 'Khulna'
		| 'Barishal'
		| 'Sylhet'
		| 'Rangpur'
		| 'Comilla';
	breed: string;
	weight: number;
	label: 'for sale' | 'sold out';
	category: 'Dairy' | 'Beef' | 'Dual Purpose';
	seller: Types.ObjectId | IUser;
}

export type CowModel = Model<ICow, Record<string, unknown>>;
