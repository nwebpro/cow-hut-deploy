import express from 'express';
import { RequestValidation } from '../../middleware/validateRequest';
import { CowValidation } from './Cow.validation';
import { CowController } from './Cow.controller';

const router = express.Router();

router.post(
	'/',
	RequestValidation(CowValidation.createCowZodSchema),
	CowController.createCow
);

router.get('/:id', CowController.getSingleCow);
router.patch(
	'/:id',
	RequestValidation(CowValidation.updateCowZodSchema),
	CowController.updateCow
);

router.delete('/:id', CowController.deleteCow);
router.get('/', CowController.getAllCows);

export const CowRoutes = router;
