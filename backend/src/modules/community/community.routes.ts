import { Router } from 'express';
import * as communityController from './community.controller';
import { validate } from '../../middleware/validation.middleware';
import { createPostSchema, createCommentSchema, paramIdSchema } from './community.validation';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post('/', validate(createPostSchema), communityController.createPost);
router.get('/', communityController.getPosts);

router.post('/:id/like', validate(paramIdSchema), communityController.toggleLike);

router.post('/:id/comments', validate(createCommentSchema), communityController.createComment);
router.get('/:id/comments', validate(paramIdSchema), communityController.getComments);

export default router;
