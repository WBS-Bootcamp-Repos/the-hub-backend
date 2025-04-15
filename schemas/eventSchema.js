import Joi from "joi";

const eventSchema = {
  POST: Joi.object({
    user_id: Joi.number().integer().optional(),
    community_id: Joi.number().integer().optional(),

    title: Joi.string().max(255).required(),
    date: Joi.date().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().optional().allow(null),
    description: Joi.string().max(500).required(),
    location: Joi.string().max(255).optional().allow(null),
    type: Joi.string().max(50).required(),
  }).or("user_id", "community_id"), // either user or community

  PUT: Joi.object({
    user_id: Joi.number().integer().optional(),
    community_id: Joi.number().integer().optional(),
    title: Joi.string().max(255).optional(),
    date: Joi.date().optional(),
    start_time: Joi.date().optional(),
    end_time: Joi.date().optional().allow(null),
    description: Joi.string().max(500).optional(),
    location: Joi.string().max(255).optional().allow(null),
    type: Joi.string().max(50).optional(),
  }),
};

export default eventSchema;
