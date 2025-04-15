import Joi from "joi";

const commentSchema = {
  POST: Joi.object({
    content: Joi.string().min(1).max(500).required(),
    post_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
  }),

  PUT: Joi.object({
    content: Joi.string().min(1).max(500).required(),
  }),
};

export default commentSchema;
