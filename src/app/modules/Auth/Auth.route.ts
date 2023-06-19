import express from 'express';
import { RequestValidation } from '../../middleware/validateRequest';
import { UserValidation } from '../User/User.validation';
import { AuthController } from './Auth.controller';

const router = express.Router();

router.post(
	'/signup',
	RequestValidation(UserValidation.createUserZodSchema),
	AuthController.createUser
);

export const AuthRoutes = router;
