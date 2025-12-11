import * as recipesService from "../services/recipesServices.js";

export const getRecipesController = async (req, res, next) => {
  try {
    const { page, limit, category, area, ingredient } = req.query;

    const recipes = await recipesService.getRecipesService(
      page,
      limit,
      category,
      area,
      ingredient
    );
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};
