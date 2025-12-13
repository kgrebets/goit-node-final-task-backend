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

export const createRecipeController = async (req, res, next) => {
  try {
    const recipeData = req.body;
    const userId = req.user.id;

    const recipe = await recipesService.createRecipe(recipeData, userId);

    const ingredients =
      recipe.recipeIngredients?.map((ri) => ({
        id: ri.ingredient.id,
        name: ri.ingredient.name,
        img: ri.ingredient.img,
        description: ri.ingredient.description,
        measure: ri.measure,
      })) ?? [];

    res.status(201).json({
      _id: { $oid: String(recipe.id) },
      title: recipe.title,
      category: recipe.category,
      owner: { $oid: recipe.userid },
      area: recipe.area,
      instructions: recipe.instructions,
      description: recipe.description,
      thumb: recipe.thumb,
      time: String(recipe.time),
      ingredients: ingredients.map((ing) => ({
        id: ing.id,
        measure: ing.measure,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await recipesService.deleteRecipe(id, userId);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};
