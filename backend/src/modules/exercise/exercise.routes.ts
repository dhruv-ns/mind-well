import { Router } from 'express';
import * as exerciseController from './exercise.controller';
import { validate } from '../../middleware/validation.middleware';
import { toggleExerciseSchema } from './exercise.validation';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/:id/toggle', validate(toggleExerciseSchema), exerciseController.toggleExercise);
router.get('/progress', exerciseController.getProgress);

export default router;
