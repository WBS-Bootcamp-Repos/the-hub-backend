import Joi from "joi";

const communityListSchema = {
  POST: Joi.object({
    community_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    category: Joi.string().max(50).required(),
    privacy: Joi.string().valid("Public", "Private").required(),
  }),

  PUT: Joi.object({
    title: Joi.string().max(255).optional(),
    category: Joi.string().max(50).optional(),
    privacy: Joi.string().valid("Public", "Private").optional(),
  }),
};

export default communityListSchema;
