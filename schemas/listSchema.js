import Joi from "joi";

const listSchema = {
  POST: Joi.object({
    user_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    category: Joi.string().max(50).required(),
    privacy: Joi.string().max(50).required(),
  }),

  PUT: Joi.object({
    user_id: Joi.number().integer().optional(),
    title: Joi.string().max(255).optional(),
    category: Joi.string().max(50).optional(),
    privacy: Joi.string().max(50).optional(),
  }),
};

export default listSchema;
