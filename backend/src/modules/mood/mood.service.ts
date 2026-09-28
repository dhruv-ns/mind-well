import { MoodLog } from '../../models/mood.model';
import { User } from '../../models/user.model';
import { CreateMoodInput, GetMoodsQuery } from './mood.validation';
import mongoose from 'mongoose';

export const createMoodLog = async (userId: string, data: CreateMoodInput) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Optional: check if they already logged today and update, or just add new.
  // We'll update the existing one for the day if it exists, as frontend does "save mood log" for today
  let moodLog = await MoodLog.findOne({
    userId,
    recordedAt: { $gte: startOfDay },
  });

  if (moodLog) {
    moodLog.score = data.score;
    if (data.note !== undefined) moodLog.note = data.note;
    if (data.factors) moodLog.factors = data.factors;
    await moodLog.save();
  } else {
    moodLog = await MoodLog.create({
      userId,
      score: data.score,
      note: data.note,
      factors: data.factors,
    });
  }

  // Update streak logic
  const user = await User.findById(userId);
  if (user) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayLog = await MoodLog.findOne({
      userId,
      recordedAt: { $gte: yesterday, $lt: startOfDay },
    });

    if (yesterdayLog) {
      user.streak += 1;
    } else if (!moodLog.isNew) {
      // already had a log today, streak unchanged
    } else {
      user.streak = 1;
    }
    await user.save({ validateBeforeSave: false });
  }

  return moodLog;
};

export const getMoodLogs = async (userId: string, query: GetMoodsQuery) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - query.days);

  const logs = await MoodLog.find({
    userId,
    recordedAt: { $gte: cutoff },
  }).sort({ recordedAt: 1 }); // oldest to newest for charts

  return logs;
};

export const getMoodStats = async (userId: string) => {
  const user = await User.findById(userId).select('streak');

  const stats = await MoodLog.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, avgScore: { $avg: '$score' }, count: { $sum: 1 } } }
  ]);

  return {
    streak: user?.streak || 0,
    averageMood: stats[0] ? Number(stats[0].avgScore.toFixed(1)) : 0,
    totalLogs: stats[0] ? stats[0].count : 0,
  };
};
