import mongoose, { Document, Schema } from 'mongoose';

export interface IMoodLog extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  note?: string;
  factors: string[];
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MoodLogSchema = new Schema<IMoodLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    score: { type: Number, required: true, min: 1, max: 5 },
    note: { type: String, trim: true },
    factors: [{ type: String, trim: true }],
    recordedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Index to quickly fetch a user's moods in date order
MoodLogSchema.index({ userId: 1, recordedAt: -1 });

export const MoodLog = mongoose.model<IMoodLog>('MoodLog', MoodLogSchema);
