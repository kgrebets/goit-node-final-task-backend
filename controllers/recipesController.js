import * as recipesService from "../services/recipesService.js";

export const getRecipesController = async (req, res, next) => {
  try {
    const { page, limit, category, area, ingredient } = req.query;

    const recipes = await recipesService.getRecipes({
      page,
      limit,
      category,
      area,
      ingredient,
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipesService.getRecipeById(id);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};
