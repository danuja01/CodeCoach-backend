import { moduleLogger } from '@sliit-foss/module-logger';
import mongoose from 'mongoose';
import { Challenge } from '@/models';

const logger = moduleLogger('Challange-Repository');

// this function saves a new coding challenge in the database
export const createChallenge = async (challenge) => {
  try {
    const newChallenge = (await new Challenge(challenge).save()).toObject();
    return newChallenge;
  } catch (err) {
    logger.error(`An error occured when saving the code challenge - err: ${err.message}`);
    throw err;
  }
};

// this function search the database for a challenge using challenge id
export const getChallenge = async (filters) => {
  try {
    const challenge = await Challenge.findOne(filters).lean();

    if (!challenge) {
      return null;
    }

    return challenge;
  } catch (err) {
    logger.error(`An error occured when searching for the challenge - err: ${err.message}`);
    throw err;
  }
};

// this function returns all the challenges stored in the database
export const getAllChallenges = async ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  try {
    const options = {
      page,
      limit
    };

    if (Object.keys(sort).length > 0) {
      options.sort = sort;
    }

    const aggregateQuery = () =>
      Challenge.aggregate([
        {
          $match: filter
        }
      ]);

    return (await page) ? Challenge.aggregatePaginate(aggregateQuery(), options) : aggregateQuery();
  } catch (err) {
    logger.error(`An error occured when retrieving challenges - err: ${err.message}`);
    throw err;
  }
};

// this function find a challenge using the id and updates the challenge
export const findOneAndUpdateChallenge = async (filters, data) => {
  try {
    const challenge = await Challenge.findOneAndUpdate(filters, data, { new: true }).lean();

    if (!challenge) {
      return null;
    }

    return challenge;
  } catch (err) {
    logger.error(`An error occured while uppdating the challenge - err: ${err.message}`);
    throw err;
  }
};

// this function find a challenge using the id and deletes the challenge
export const findOneAndRemoveChallenge = async (filters) => {
  try {
    return await Challenge.findOneAndRemove(filters);
  } catch (err) {
    logger.error(`An error occured while removing the challenge - err: ${err.message}`);
    throw err;
  }
};

// this function find the test cases of a challenge using challenge id
export const getTestCases = async (filters) => {
  try {
    const testCases = await Challenge.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filters._id)
        }
      },
      {
        $project: {
          testCases: 1
        }
      }
    ]).exec();

    return testCases;
  } catch (err) {
    logger.error(`An error occurred when retrieving test cases - err: ${err.message}`);
    throw err;
  }
};
