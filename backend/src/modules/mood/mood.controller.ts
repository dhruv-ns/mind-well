import { Request, Response, NextFunction } from 'express';
import * as moodService from './mood.service';

export const createMoodLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const log = await moodService.createMoodLog(req.user._id, req.body);
    res.status(201).json({
      success: true,
      data: { log },
      message: 'Mood logged successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getMoodLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await moodService.getMoodLogs(req.user._id, req.query as any);
    res.status(200).json({
      success: true,
      data: { logs },
    });
  } catch (error) {
    next(error);
  }
};

export const getMoodStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await moodService.getMoodStats(req.user._id);
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
