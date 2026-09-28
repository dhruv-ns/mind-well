import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error, 'Error connecting to MongoDB');
    process.exit(1);
    
  }
};
