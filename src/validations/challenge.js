import { Joi } from 'celebrate';

export const addChallengeSchema = {
  description: Joi.string().required(),
  isPublic: Joi.boolean().optional(),
  publisher: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  testCases: Joi.array()
    .items(
      Joi.object({
        testNo: Joi.string().required(),
        description: Joi.string().required(),
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
  description: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  publisher: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  testCases: Joi.array()
    .items(
      Joi.object({
        testNo: Joi.string().optional(),
        description: Joi.string().optional(),
        output: Joi.string().optional(),
        _id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .optional()
      })
    )
    .optional()
};
