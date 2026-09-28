import { Router } from 'express';
import * as authController from './auth.controller';
import { validate } from '../../middleware/validation.middleware';
import { registerSchema, loginSchema } from './auth.validation';
import { requireAuth } from '../../middleware/auth.middleware';
import { authLimiter } from '../../middleware/rateLimit.middleware';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', requireAuth, authController.getMe);

export default router;
