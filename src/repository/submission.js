/**
 * submission Repository
 * @author Danuja Jayasuriya
 * @description This module provides functions to interact with submissions in a database.
 * @methods insertSubmission, getSubmissions, updateSubmission, getSubmissionById, getOneSubmission
 */
import { moduleLogger } from '@sliit-foss/module-logger';
import { Submission } from '@/models';

const logger = moduleLogger('Submission-repository');

export const insertSubmission = async (data) => {
  const newSubmission = new Submission(data);
  await newSubmission.save();
};

export const getSubmissions = async ({ sort = {}, filter = {}, page, limit = 10 }) => {
  const populate = ['userId', 'questionId', 'testCasesStatus.testCaseId'];

  const options = {
    sort,
    page,
    limit,
    collation: {
      locale: 'en'
    },
    populate
  };

  return (await page)
    ? Submission.paginate(filter, options).catch((err) => {
        logger.error(`An error occurred when retrieving submissions - err: ${err.message}`);
        throw err;
      })
    : Submission.find(filter).sort(sort).populate(populate).lean();
};

export const updateSubmission = async (id, data) => {
  const query = { _id: id };
  await Submission.findOneAndUpdate(
    query,
    {
      ...data,
      $inc: { attempts: 1 }
    },
    { upsert: true }
  );
};

export const getSubmissionById = (id) => {
  return Submission.findById(id).lean();
};

export const getOneSubmission = (filters, options = {}) => {
  return Submission.findOne(filters, options).lean();
};
