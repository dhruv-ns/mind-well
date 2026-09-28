import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Message cannot be empty').max(1000),
  }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>['body'];
