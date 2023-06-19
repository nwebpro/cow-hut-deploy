import { role } from './User.constant';
import { Model } from 'mongoose';

export interface UserName {
	firstName: string;
	middleName: string;
	lastName: string;
}
export interface IUserFilters {
	searchTerm?: string;
	name?: string;
	phoneNumber?: string;
	role?: string;
}

export interface IUser {
	name: UserName;
	phoneNumber: string;
	role: 'seller' | 'buyer';
	password: string;
	address: string;
	budget: number;
	income: number;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
