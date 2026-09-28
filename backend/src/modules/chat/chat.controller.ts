import { Request, Response, NextFunction } from 'express';
import * as chatService from './chat.service';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await chatService.processMessage(req.user._id, req.body.content);
    res.status(201).json({
      success: true,
      data: result,
      message: 'Message sent',
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const history = await chatService.getHistory(req.user._id);
    res.status(200).json({
      success: true,
      data: { history },
    });
  } catch (error) {
    next(error);
  }
};
