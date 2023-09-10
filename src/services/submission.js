/**
 * Submission service
 * @author Danuja Jayasuriya
 * @description This module provides functions to interact with submissions in a database.
 * @methods insertSubmissionService, updateSubmissionService, viewSubmissionsService, getSubmissionByIdService, getOneSubmissionService
 */
import createError from 'http-errors';
import {
  getOneSubmission,
  getSubmissionById,
  getSubmissions,
  insertSubmission,
  updateSubmission
} from '@/repository/submission';

export const insertSubmissionService = async (data) => {
  const submission = await getOneSubmission({ userId: data.userId, questionId: data.questionId });

  try {
    if (!submission) {
      await insertSubmission(data);
    } else {
      await updateSubmissionService(submission._id, data);
    }
  } catch (err) {
    throw new createError(500, 'Error when processing submission');
  }
};

const updateSubmissionService = async (id, data) => {
  const submission = await updateSubmission(id, data);
  if (!submission) throw new createError(422, 'Invalid submission ID');
  return submission;
};

export const viewSubmissionsService = (query) => {
  return getSubmissions(query);
};

export const getSubmissionByIdService = async (id) => {
  const submission = await getSubmissionById(id);
  if (!submission) throw new createError(422, 'Invalid submission ID');
  return submission;
};

export const getOneSubmissionService = async (query, options) => {
  const submission = await getOneSubmission(query, options);
  if (!submission) throw new createError(422, 'Invalid submission ID');
  return submission;
};
