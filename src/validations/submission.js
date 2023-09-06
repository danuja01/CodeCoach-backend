/**
 * @author Danuja Jayasuriya
 * @description This module provides functions to validate submission data.
 * @methods submissionIdSchema, submissionCreateSchema, submissionUpdateSchema, submissionViewSchema
 */
import { Joi } from 'celebrate';

export const submissionIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const submissionCreateSchema = {
  userId: Joi.string().hex().length(24).required(),
  questionId: Joi.string().hex().length(24).required(),
  code: Joi.string().required(),
  language: Joi.string().required(),
  score: Joi.number().optional(),
  testCasesStatus: Joi.array()
    .items(
      Joi.object({
        testCaseId: Joi.string().hex().length(24).required(),
        status: Joi.string().valid('Completed', 'Failed').required()
      })
    )
    .optional(),
  attempts: Joi.number().optional()
};

export const submissionUpdateSchema = {
  code: Joi.string().optional(),
  language: Joi.string().optional(),
  score: Joi.number().optional(),
  testCasesStatus: Joi.array()
    .items(
      Joi.object({
        testCaseId: Joi.string().hex().length(24).required(),
        status: Joi.string().valid('Completed', 'Failed').required()
      })
    )
    .optional(),
  attempts: Joi.number().optional()
};

export const submissionViewSchema = {
  filter: Joi.object()
    .keys({
      _id: Joi.string().hex().length(24).optional(),
      questionId: Joi.string().hex().length(24).optional(),
      userId: Joi.string().hex().length(24).optional(),
      attempts: Joi.number().optional()
    })
    .optional(),
  sort: Joi.object()
    .keys({
      score: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
      created_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional(),
      updated_at: Joi.any().valid('asc', 'desc', '1', '-1', 1, -1).optional()
    })
    .optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional()
};

export const viewOneSubmissionSchema = {
  filter: Joi.object().keys({
    _id: Joi.string().hex().length(24).optional(),
    questionId: Joi.string().hex().length(24).optional(),
    userId: Joi.string().hex().length(24).optional(),
    attempts: Joi.number().optional()
  })
};
