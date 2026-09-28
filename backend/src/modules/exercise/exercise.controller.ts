import { Request, Response, NextFunction } from 'express';
import * as exerciseService from './exercise.service';

export const toggleExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await exerciseService.toggleExerciseProgress(req.user._id, Number(req.params.id));
    res.status(200).json({
      success: true,
      data: result,
      message: result.done ? 'Exercise marked as done' : 'Exercise marked as undone',
    });
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await exerciseService.getExerciseProgress(req.user._id);
    res.status(200).json({
      success: true,
      data: { completed: progress.map((p) => p.exerciseId) },
    });
  } catch (error) {
    next(error);
  }
};
