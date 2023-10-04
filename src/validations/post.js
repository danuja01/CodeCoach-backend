import { Joi } from 'celebrate';

export const createPostSchema = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  lab: Joi.string().required(),
  challenge: Joi.string().required(),
};

export const postIdSchema = {
  id: Joi.string().hex().length(24).required(),
};
