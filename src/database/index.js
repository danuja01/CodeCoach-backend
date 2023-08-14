import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';

const logger = moduleLogger('Database-Connetion');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { connectTimeoutMS: 3000 })
    .catch((err) => logger.error(`Error connecting to DB: ${err}`));

  mongoose.connection.on('connected', () => logger.info('Database connection established successfully'));

  mongoose.connection.on('error', (err) => logger.error(`Error connecting to DB: ${err}`));
};

export default connectDB;
