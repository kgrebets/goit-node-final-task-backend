import Joi from "joi";

export const getIngredientsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(12),
  name: Joi.string().optional(),
});

export const ingredientSchema = Joi.object({
  id: Joi.string().trim().required(),
  measure: Joi.string().trim().min(1).required(),
});

export const ingredientsArraySchema = Joi.array()
  .min(1)
  .items(ingredientSchema)
  .required();
