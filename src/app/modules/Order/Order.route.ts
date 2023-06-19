import express from 'express';
import { RequestValidation } from '../../middleware/validateRequest';
import { OrderValidation } from './Order.validation';
import { OrderController } from './Order.controller';

const router = express.Router();

router.post(
	'/',
	RequestValidation(OrderValidation.createOrderZodSchema),
	OrderController.createOrder
);

router.get('/', OrderController.getAllOrders);

export const OrderRoutes = router;
