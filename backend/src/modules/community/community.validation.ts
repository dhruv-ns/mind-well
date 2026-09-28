import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(10, 'Post must be at least 10 characters').max(1000),
  }),
});

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(2, 'Comment must be at least 2 characters').max(500),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid post ID'),
  }),
});

export const paramIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type CreateCommentInput = z.infer<typeof createCommentSchema>['body'];
