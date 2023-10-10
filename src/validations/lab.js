import { Joi } from 'celebrate';

export const createLabSchema = {
  moduleName: Joi.string().required(),
  batchGroup: Joi.string().required(),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional()
};

export const labIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateLabSchema = {
  moduleName: Joi.string().optional(),
  batchGroup: Joi.string().optional(),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional()
};
