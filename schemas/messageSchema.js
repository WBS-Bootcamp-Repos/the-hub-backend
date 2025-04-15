import Joi from "joi";

const messageSchema = {
  POST: Joi.object({
    user_id: Joi.number().integer().required(),
    content: Joi.string().allow(null, "").optional(),
    community_id: Joi.number().integer().optional().allow(null),
  }),

  PUT: Joi.object({
    user_id: Joi.number().integer().required(),
    content: Joi.string().allow(null, "").optional(),
    community_id: Joi.number().integer().optional().allow(null),
  }),
};

export default messageSchema;
