import { Joi } from 'celebrate';

export const createLabSchema = {
  moduleName: Joi.string().required(),
  batchGroup: Joi.string().required(),
  students: Joi.array().items(Joi.string().hex().length(24)).optional(),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional(),
  forum: Joi.string().hex().length(24).optional()
};

export const labIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateLabSchema = {
  moduleName: Joi.string().optional(),
  batchGroup: Joi.string().optional(),
  students: Joi.array().items(Joi.string().hex().length(24)).optional(),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional(),
  forum: Joi.string().hex().length(24).optional()
};
