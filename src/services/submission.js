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
  const submission = await insertSubmission(data);
  return submission;
};

export const updateSubmissionService = async (id, data) => {
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

export const getOneSubmissionService = async (query) => {
  const submission = await getOneSubmission(query);
  if (!submission) throw new createError(422, 'Invalid submission ID');
  return submission;
};
