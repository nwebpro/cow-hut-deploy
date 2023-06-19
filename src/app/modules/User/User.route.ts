import express from 'express';
import { UserController } from './User.controller';
import { RequestValidation } from '../../middleware/validateRequest';
import { UserValidation } from './User.validation';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.patch(
	'/:id',
	RequestValidation(UserValidation.updateUserZodSchema),
	UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
