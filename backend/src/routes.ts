import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes';
import moodRoutes from './modules/mood/mood.routes';
import exerciseRoutes from './modules/exercise/exercise.routes';
import chatRoutes from './modules/chat/chat.routes';
import communityRoutes from './modules/community/community.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/moods', moodRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/chat', chatRoutes);
router.use('/posts', communityRoutes);

export default router;
