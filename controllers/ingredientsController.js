import * as ingredientsService from "../services/ingredientsService.js";

export const getAllIngredientsController = async (req, res, next) => {
  try {
    const { page, limit, name } = req.query;

    const result = await ingredientsService.getAllIngredients({
      page,
      limit,
      name,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

