import { Joi } from 'celebrate';

export const addChallengeSchema = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  isPublic: Joi.boolean().optional(),
  publisher: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  testCases: Joi.array()
    .items(
      Joi.object({
        testName: Joi.string().required(),
        description: Joi.string().required(),
        input: Joi.string().required(),
        output: Joi.string().required()
      })
    )
    .required()
};

export const challengeIdSchema = {
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
};

export const updateChallengeSchema = {
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  publisher: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  testCases: Joi.array()
    .items(
      Joi.object({
        testName: Joi.string().optional(),
        description: Joi.string().optional(),
        input: Joi.string().optional(),
        output: Joi.string().optional(),
        _id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .optional()
      })
    )
    .optional()
};
