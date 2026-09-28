import { Router } from 'express';
import * as moodController from './mood.controller';
import { validate } from '../../middleware/validation.middleware';
import { createMoodSchema, getMoodsSchema } from './mood.validation';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/', validate(createMoodSchema), moodController.createMoodLog);
router.get('/', validate(getMoodsSchema), moodController.getMoodLogs);
router.get('/stats', moodController.getMoodStats);

export default router;
