import mongoose, { Document, Schema } from 'mongoose';

export interface IExerciseProgress extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseProgressSchema = new Schema<IExerciseProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    exerciseId: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Prevent same exercise from being completed multiple times on the same day if we wanted to restrict it
// For this app, we simply track if it has EVER been completed (toggle on/off).
// We'll enforce one record per (userId, exerciseId) pair for toggle behavior.
ExerciseProgressSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

export const ExerciseProgress = mongoose.model<IExerciseProgress>('ExerciseProgress', ExerciseProgressSchema);
