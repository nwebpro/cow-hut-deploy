import { z } from 'zod';
import { category, label, location } from './Cow.constant';

const createCowZodSchema = z.object({
	body: z.object({
		name: z.string({
			required_error: 'Name is required',
		}),
		age: z.number({
			required_error: 'Age is required',
		}),
		price: z.number({
			required_error: 'Price is required',
		}),
		location: z.enum([...location] as [string, ...string[]], {
			required_error: 'Location is required',
		}),
		breed: z.string({
			required_error: 'Breed is required',
		}),
		weight: z.number({
			required_error: 'Weight is required',
		}),
		label: z.enum([...label] as [string, ...string[]]).optional(),
		category: z.enum([...category] as [string, ...string[]], {
			required_error: 'Category is required',
		}),
		seller: z.string({
			required_error: 'Seller is required',
		}),
	}),
});

const updateCowZodSchema = z.object({
	body: z.object({
		name: z.string({}).optional(),
		age: z.number({}).optional(),
		price: z.number({}).optional(),
		location: z.enum([...location] as [string, ...string[]], {}).optional(),
		breed: z.string({}).optional(),
		weight: z.number({}).optional(),
		label: z.enum([...label] as [string, ...string[]], {}).optional(),
		category: z.enum([...category] as [string, ...string[]], {}).optional(),
		seller: z.string({}).optional(),
	}),
});

export const CowValidation = {
	createCowZodSchema,
	updateCowZodSchema,
};
