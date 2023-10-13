import { Joi } from 'celebrate';

export const createReplySchema = {
  post: Joi.string().hex().length(24).required(),
  comment: Joi.string().required(),
  author: Joi.string().hex().length(24).required()
};
