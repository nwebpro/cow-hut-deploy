import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { userSearchableFields } from './User.constant';
import { IUser, IUserFilters } from './User.interface';
import { User } from './User.model';
import ApiError from '../../../errors/ApiErrors';

// Get All User
const getAllUsers = async (
	filters: IUserFilters,
	paginationOption: IPaginationOption
): Promise<IGenericResponse<IUser[]>> => {
	const { searchTerm, ...filtersData } = filters;
	const andCondition = [];
	if (searchTerm) {
		andCondition.push({
			$or: userSearchableFields.map((field) => ({
				[field]: { $regex: searchTerm, $options: 'i' },
			})),
		});
	}

	//   Exact Match Filter
	if (Object.keys(filtersData).length) {
		andCondition.push({
			$and: Object.entries(filtersData).map(([field, value]) => ({
				[field]: value,
			})),
		});
	}

	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(paginationOption);

	const sortCondition: { [key: string]: SortOrder } = {};
	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const whereCondition =
		andCondition.length > 0 ? { $and: andCondition } : {};
	const result = await User.find(whereCondition)
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);
	const total = await User.countDocuments(whereCondition);
	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

// Get Single User
const getSingleUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findById(id);
	return result;
};

// Update User
const updateUser = async (
	id: string,
	payload: Partial<IUser>
): Promise<IUser | null> => {
	const isExist = await User.findOne({ _id: id });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	const { name, ...userData } = payload;
	const updatedUserData: Partial<IUser> = { ...userData };

	// Dynamically Handle embedded object Name field
	if (name && Object.keys(name).length > 0) {
		Object.keys(name).forEach((key) => {
			const nameKey = `name.${key}` as keyof Partial<IUser>;
			(updatedUserData as any)[nameKey] = name[key as keyof typeof name];
		});
	}

	const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
		new: true,
	});
	return result;
};

// Delete User
const deleteUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findByIdAndDelete(id);
	return result;
};

export const UserService = {
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
