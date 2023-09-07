import { Joi } from 'celebrate';

export const createLabSchema = {
  date: Joi.date().required(),
  time: Joi.string().required(),
  duration: Joi.number().integer().required(),
  lecturer: Joi.string().hex().length(24).required(),
  students: Joi.array().items(Joi.string().hex().length(24)),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional()
};

export const labIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const updateLabSchema = {
  date: Joi.date().optional(),
  time: Joi.string().optional(),
  duration: Joi.number().integer().optional(),
  lecturer: Joi.string().hex().length(24).optional(),
  students: Joi.array().items(Joi.string().hex().length(24)),
  codeChallenges: Joi.array().items(Joi.string().hex().length(24)).optional()
};
