import { ExerciseProgress } from '../../models/exercise.model';

export const toggleExerciseProgress = async (userId: string, exerciseId: number) => {
  const existing = await ExerciseProgress.findOne({ userId, exerciseId });

  if (existing) {
    // If it exists, remove it (toggle off)
    await ExerciseProgress.deleteOne({ _id: existing._id });
    return { done: false, exerciseId };
  } else {
    // If not, add it (toggle on)
    await ExerciseProgress.create({ userId, exerciseId });
    return { done: true, exerciseId };
  }
};

export const getExerciseProgress = async (userId: string) => {
  const completed = await ExerciseProgress.find({ userId }).select('exerciseId completedAt -_id');
  return completed;
};
