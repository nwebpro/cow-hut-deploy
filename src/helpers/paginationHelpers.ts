import { SortOrder } from 'mongoose';
import { ICow } from '../app/modules/Cow/Cow.interface';

interface IOptions {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: SortOrder;
	minPrice?: number;
	maxPrice?: number;
}
interface IOptionsResult {
	page: number;
	limit: number;
	skip: number;
	sortBy: string;
	sortOrder: SortOrder;
	minPrice: number;
	maxPrice: number;
}
const calculatePagination = (option: IOptions): IOptionsResult => {
	const page = Number(option.page) || 1;
	const limit = Number(option.limit) || 10;
	const skip = (page - 1) * limit;
	const sortBy = option.sortBy || 'createdAt';
	const sortOrder = option.sortOrder || 'desc';
	const minPrice = option.minPrice as number;
	const maxPrice = option.maxPrice as number;

	return {
		page,
		limit,
		skip,
		sortBy,
		sortOrder,
		minPrice,
		maxPrice,
	};
};

export const paginationHelpers = {
	calculatePagination,
};
