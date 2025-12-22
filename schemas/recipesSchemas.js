import Joi from "joi";

export const getRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
  categoryid: Joi.string().optional(),
  areaid: Joi.string().optional(),
  ingredientid: Joi.string().optional(),
});

export const getRecipeByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const getPopularRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(4),
});

export const createRecipeBodySchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  categoryid: Joi.string().required(),
  areaid: Joi.string().required(),
  instructions: Joi.string().min(1).required(),
  description: Joi.string().required(),
  time: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  ingredients: Joi.string().required(),
});

export const deleteRecipeSchema = Joi.object({
  id: Joi.string().required(),
});

export const getUserRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
});
