import * as recipesService from "../services/recipesService.js";

export const getRecipesController = async (req, res, next) => {
  const { page, limit, categoryid, areaid, ingredient } = req.query;

  const {
    recipes,
    total,
    page: pageNumber,
    totalPages,
  } = await recipesService.getRecipes({
    page,
    limit,
    categoryid,
    areaid,
    ingredient,
  });

  res.json({
    total,
    page: pageNumber,
    totalPages,
    results: recipes,
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  res.json(recipe);
};

export const getPopularRecipesController = async (req, res, next) => {
  const { page, limit } = req.query;
  const data = await recipesService.getPopularRecipes({ page, limit });
  res.json(data);
};
