import { moduleLogger } from '@sliit-foss/module-logger';
import { Lab } from '@/models';

const logger = moduleLogger('Lab-Repository');

export const createLab = async (lab) => {
  const newLab = (await new Lab(lab).save()).toObject();
  return newLab;
};

export const getAllLabs = ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  const options = {
    page,
    limit
  };

  if (Object.keys(sort).length > 0) options.sort = sort;

  const aggregateQuery = () =>
    Lab.aggregate([
      {
        $match: filter
      },
      {
        $project: {
          // password: 0
        }
      }
    ]);

  return (page ? Lab.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
    logger.error(`An error occurred when retrieving labs - err: ${err.message}`);
    throw err;
  });
};

export const getLabsByUser = async (user) => {
  if (!user) {
    throw new Error('User not provided');
  }

  let query = {};

  if (user.role === 'LECTURER') {
    // If the user is a lecturer, fetch labs created by the lecturer
    query = { lecturer: user._id };
  } else if (user.role === 'STUDENT') {
    // If the user is a student, fetch labs assigned to the student
    query = { students: user._id };
  }

  try {
    const labs = await Lab.find(query).populate('lecturer students codeChallenges');
    return labs;
  } catch (error) {
    logger.error(`An error occurred when retrieving labs - err: ${error.message}`);
    throw error;
  }
};

export const getLabById = async (labId) => {
  const lab = await Lab.findOne({ _id: labId }).lean();
  return lab;
};

export const updateLab = async (labId, data) => {
  const updatedLab = await Lab.findOneAndUpdate({ _id: labId }, data, { new: true }).lean();
  return updatedLab;
};

export const deleteLab = (labId) => {
  return Lab.findOneAndRemove({ _id: labId });
};
