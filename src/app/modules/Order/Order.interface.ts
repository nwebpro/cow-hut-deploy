import { Model, Types } from 'mongoose';
import { ICow } from '../Cow/Cow.interface';
import { IUser } from '../User/User.interface';

export interface IOrder {
	cow: Types.ObjectId | ICow;
	buyer: Types.ObjectId | IUser;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;
