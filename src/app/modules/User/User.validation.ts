import { z } from 'zod';
import { role } from './User.constant';

const createUserZodSchema = z.object({
	body: z.object({
		name: z.object({
			firstName: z.string({
				required_error: 'First name is required',
			}),
			lastName: z.string({
				required_error: 'Last name is required',
			}),
			middleName: z.string().optional(),
		}),
		password: z.string({
			required_error: 'Password is required',
		}),
		role: z.enum([...role] as [string, ...string[]], {
			required_error: 'Role is required',
		}),
		phoneNumber: z.string({
			required_error: 'Phone number is required',
		}),
		address: z.string({
			required_error: 'Address is required',
		}),
		budget: z.number({
			required_error: 'Budget is required',
		}),
		income: z.number().optional(),
	}),
});

const updateUserZodSchema = z.object({
	body: z.object({
		name: z
			.object({
				firstName: z.string().optional(),
				lastName: z.string().optional(),
				middleName: z.string().optional(),
			})
			.optional(),
		password: z.string().optional(),
		role: z.enum([...role] as [string, ...string[]]).optional(),
		phoneNumber: z.string().optional(),
		address: z.string().optional(),
		budget: z.number().optional(),
		income: z.number().optional(),
	}),
});

export const UserValidation = {
	createUserZodSchema,
	updateUserZodSchema,
};
