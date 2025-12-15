import * as ingredientsService from "../services/ingredientsService.js";

export const getAllIngredientsController = async (req, res) => {
  const { page, limit, name } = req.query;

  const result = await ingredientsService.getAllIngredients({
    page,
    limit,
    name,
  });

  res.status(200).json(result);
};
