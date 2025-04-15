import Joi from "joi";

const communitySchema = {
  POST: Joi.object({
    name: Joi.string().max(100).required(),
  }),

  PUT: Joi.object({
    name: Joi.string().max(100).optional(),
    settings: Joi.object({
      calendar: Joi.boolean(),
      lists: Joi.boolean(),
      posts: Joi.boolean(),
      events: Joi.boolean(),
      messages: Joi.boolean(),
    }).optional(),
  }),

  SETTINGS_UPDATE: Joi.object({
    settings: Joi.object({
      calendar: Joi.boolean(),
      lists: Joi.boolean(),
      posts: Joi.boolean(),
      events: Joi.boolean(),
      messages: Joi.boolean(),
    }).required(),
  }),
};

export default communitySchema;
