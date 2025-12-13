import * as recipesService from "../services/recipesService.js";

export const getRecipesController = async (req, res, next) => {
  try {
    const { page, limit, category, area, ingredient } = req.query;

    const {
      recipes,
      total,
      page: pageNumber,
      totalPages,
    } = await recipesService.getRecipes({
      page,
      limit,
      category,
      area,
      ingredient,
    });

    const results = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      category: recipe.category,
      area: recipe.area,
      time: recipe.time,
      thumb: recipe.thumb,
      ingredients:
        recipe.recipeIngredients?.map((ri) => ({
          id: ri.ingredient.id,
          name: ri.ingredient.name,
          img: ri.ingredient.img,
          description: ri.ingredient.description,
          measure: ri.measure,
        })) ?? [],
    }));

    res.json({
      total,
      page: pageNumber,
      totalPages,
      results,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const ingredients =
      recipe.recipeIngredients?.map((ri) => ({
        id: ri.ingredient.id,
        name: ri.ingredient.name,
        img: ri.ingredient.img,
        description: ri.ingredient.description,
        measure: ri.measure,
      })) ?? [];

    res.json({
      id: recipe.id,
      title: recipe.title,
      category: recipe.category,
      area: recipe.area,
      time: recipe.time,
      description: recipe.description,
      thumb: recipe.thumb,
      ingredients,
    });
  } catch (error) {
    next(error);
  }
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
