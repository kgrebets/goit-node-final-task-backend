import HttpError from "../helpers/HttpError.js";
import * as recipesService from "../services/recipesService.js";

export const getRecipesController = async (req, res) => {
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

export const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  if (!recipe) {
    throw HttpError(404, "Recipe not found");
  }
  res.json(recipe);
};

export const getPopularRecipesController = async (req, res, next) => {
  const { page, limit } = req.query;
  const data = await recipesService.getPopularRecipes({ page, limit });
  res.json(data);
};

export const createRecipeController = async (req, res) => {
  const recipeData = req.body;
  const userId = req.user.id;

  const recipe = await recipesService.createRecipe(recipeData, userId);

  res.status(201).json(recipe);
};

export const deleteRecipeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const recipe = await recipesService.getRecipeById(id);

  if (!recipe) throw HttpError(404, "Recipe not found");

  if (recipe.userid !== userId) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot delete this recipe." });
  }

  await recipesService.deleteRecipe(id, userId);

  res.status(200).json({ message: "Recipe deleted successfully" });
};

export const getFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { page, limit } = req.query;

  const data = await recipesService.getFavoriteRecipes(userId, page, limit);

  res.status(200).json(data);
};

export const addRecipeToFavoritesController = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.id;

  const recipe = await recipesService.getRecipeById(recipeId);
  if (!recipe) throw HttpError(404, "Recipe not found");

  await recipesService.addToFavorites(userId, recipeId);

  res.status(201).json({ message: "Recipe added to favorites" });
};

export const removeRecipeFromFavoritesController = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.id;

  const isRemoved = await recipesService.removeFromFavorites(userId, recipeId);
  if (!isRemoved) {
    throw HttpError(404, "Recipe not found in favorites");
  }

  res.status(200).json({ message: "Recipe removed from favorites" });
};
