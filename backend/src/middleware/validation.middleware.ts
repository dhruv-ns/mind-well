import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstMessage = error.issues[0]?.message || 'Invalid request data';
        return res.status(400).json({
          success: false,
          message: firstMessage,
          error: {
            code: 'VALIDATION_ERROR',
            details: error.issues,
          },
        });
      }
      next(error);
    }
  };
};
