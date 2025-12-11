import Joi from "joi";

export const getRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
  category: Joi.string().optional(),
  area: Joi.string().optional(),
  ingredient: Joi.string().optional(),
});
