import Joi from "joi";

const communityPostSchema = {
  POST: Joi.object({
    community_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    content: Joi.string().required(),
    imageUrl: Joi.string().uri().optional().allow(""),
  }),

  PUT: Joi.object({
    title: Joi.string().max(255).optional(),
    content: Joi.string().optional(),
    imageUrl: Joi.string().uri().optional().allow(""),
  }),
};

export default communityPostSchema;
