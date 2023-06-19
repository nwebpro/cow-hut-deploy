import express from 'express';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { UserRoutes } from '../modules/User/User.route';
import { CowRoutes } from '../modules/Cow/Cow.route';
import { OrderRoutes } from '../modules/Order/Order.route';

const router = express.Router();

const moduleRoutes = [
	{
		path: '/auth',
		route: AuthRoutes,
	},
	{
		path: '/users',
		route: UserRoutes,
	},
	{
		path: '/cows',
		route: CowRoutes,
	},
	{
		path: '/orders',
		route: OrderRoutes,
	}
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
