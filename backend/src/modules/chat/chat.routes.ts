import { Router } from 'express';
import * as chatController from './chat.controller';
import { validate } from '../../middleware/validation.middleware';
import { sendMessageSchema } from './chat.validation';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/', validate(sendMessageSchema), chatController.sendMessage);
router.get('/', chatController.getHistory);

export default router;
