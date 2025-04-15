import Joi from "joi";

const postSchema = {
  POST: Joi.object({
    userId: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    content: Joi.string().required(),
    imageUrl: Joi.string().uri().optional().allow(""),
  }),

  PUT: Joi.object({
    userId: Joi.number().integer().optional(),
    title: Joi.string().max(255).optional(),
    content: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional().allow(""),
  }),
};

export default postSchema;
