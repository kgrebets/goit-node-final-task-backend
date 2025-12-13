import Joi from "joi";

export const getRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
  category: Joi.string().optional(),
  area: Joi.string().optional(),
  ingredient: Joi.string().optional(),
});

export const getRecipeByIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const createRecipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().optional().allow(null, ""),
  instructions: Joi.string().required(),
  description: Joi.string().optional().allow(null, ""),
  thumb: Joi.string().uri().optional().allow(null, ""),
  time: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().required(),
      })
    )
    .required(),
});

export const deleteRecipeSchema = Joi.object({
  id: Joi.string().required(),
});
