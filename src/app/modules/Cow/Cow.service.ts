import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { cowSearchableFields } from './Cow.constant';
import { ICow, ICowFilters } from './Cow.interface';
import { Cow } from './Cow.model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { User } from '../User/User.model';

// create cow
const createCow = async (cow: ICow): Promise<ICow | null> => {
	cow.label = 'for sale';
	const userData = await User.findById(cow.seller);
	// check if user is seller
	if (userData?.role === 'seller') {
		const result = await Cow.create(cow);
		return result;
	} else {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not a seller');
	}
};

// get all cows
const getAllCows = async (
	filters: ICowFilters,
	paginationOption: IPaginationOption
): Promise<IGenericResponse<ICow[]>> => {
	const { searchTerm, ...filtersData } = filters;
	const andCondition = [];
	if (searchTerm) {
		andCondition.push({
			$or: cowSearchableFields.map((field) => ({
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

	const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =
		paginationHelpers.calculatePagination(paginationOption);

	if (minPrice !== undefined && maxPrice !== undefined) {
		andCondition.push({
			$and: [
				{ price: { $gte: minPrice } },
				{ price: { $lte: maxPrice } },
			],
		});
	}

	const sortCondition: { [key: string]: SortOrder } = {};
	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const whereCondition =
		andCondition.length > 0 ? { $and: andCondition } : {};
	const result = await Cow.find(whereCondition)
		.populate('seller')
		.sort(sortCondition)
		.skip(skip)
		.limit(limit);
	const total = await Cow.countDocuments(whereCondition);
	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

// get single cow
const getSingleCow = async (id: string): Promise<ICow | null> => {
	const result = await Cow.findById(id);
	return result;
};

// Update cow
const updateCow = async (
	id: string,
	payload: Partial<ICow>
): Promise<ICow | null> => {
	const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	}).populate('seller');
	return result;
};

// Delete Cow
const deleteCow = async (id: string): Promise<ICow | null> => {
	const result = await Cow.findByIdAndDelete(id).populate('seller');
	return result;
};

export const CowService = {
	createCow,
	getSingleCow,
	getAllCows,
	updateCow,
	deleteCow,
};
