import * as recipesService from "../services/recipesService.js";

const mapRecipeWithIngredients = (recipe) => {
  const ingredients =
    recipe.recipeIngredients?.map((ri) => ({
      id: ri.ingredient.id,
      name: ri.ingredient.name,
      img: ri.ingredient.img,
      description: ri.ingredient.description,
      measure: ri.measure,
    })) ?? [];

  return {
    id: recipe.id,
    userid: recipe.userid,
    title: recipe.title,
    category: recipe.category,
    area: recipe.area,
    time: recipe.time,
    description: recipe.description,
    thumb: recipe.thumb,
    ingredients,
  };
};

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

    res.json({
      total,
      page: pageNumber,
      totalPages,
      results: recipes,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipesService.getRecipeById(id);

    res.json(mapRecipeWithIngredients(recipe));
  } catch (error) {
    next(error);
  }
};

export const getPopularRecipesController = async (req, res, next) => {
  try {
    const popularRecipes = await recipesService.getPopularRecipes({ limit });

    res.json({
      total: popularRecipes.length,
      results: popularRecipes,
    });
  } catch (error) {
    next(error);
  }
};
