/**
 * @author Danuja Jayasuriya
 * @description This module provides functions to interact with submissions in a database.
 * @methods createSubmission, viewSubmissions, getSubmissionById, getOneSubmission
 */
import {
  getOneSubmissionService,
  getSubmissionByIdService,
  insertSubmissionService,
  updateSubmissionService,
  viewSubmissionsService
} from '@/repository/submission';
import { makeResponse } from '@/utils/response';

export const createSubmission = async (req, res) => {
  const submission = await getOneSubmissionService({ userId: req.body.userId, questionId: req.body.questionId });
  if (submission) updateSubmissionService(submission._id, req.body);
  else insertSubmissionService(req.body);
  return makeResponse({ res, status: 201, message: 'Submission added successfully ' });
};

export const viewSubmissions = async (req, res) => {
  const submissions = await viewSubmissionsService(req.query);
  return makeResponse({ res, data: submissions, message: 'Submissions retrieved successfully' });
};

export const getSubmissionById = async (req, res) => {
  const submission = await getSubmissionByIdService(req.params.id);
  return makeResponse({ res, data: submission, message: 'Submission retrieved successfully' });
};

export const getOneSubmission = async (req, res) => {
  const submission = await getOneSubmissionService(req.query);
  return makeResponse({ res, data: submission, message: 'Submission retrieved successfully' });
};
