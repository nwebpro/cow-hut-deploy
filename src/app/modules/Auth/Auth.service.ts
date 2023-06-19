import { IUser } from '../User/User.interface';
import { User } from '../User/User.model';

// Create User
const createUser = async (user: IUser ): Promise<IUser | null> => {
	user.income = 0;
	const result = await User.create(user);
	return result;
};

export const AuthService = {
	createUser,
};
