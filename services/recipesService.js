import {
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
} from "../db/models/index.js";
import { Op, Sequelize } from "sequelize";

const getRecipeIdsByIngredient = async (ingredientId) => {
  const links = await RecipeIngredient.findAll({
    where: { ingredientid: ingredientId },
    attributes: ["recipeid"],
    group: ["recipeid"],
  });

  return links.map((l) => l.recipeid);
};

export const getRecipes = async ({
  page,
  limit,
  categoryid,
  areaid,
  ingredient,
}) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const whereClause = {};

  if (categoryid) {
    whereClause.categoryid = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("categoryid")),
      categoryid.toLowerCase()
    );
  }

  if (areaid) {
    whereClause.areaid = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("areaid")),
      areaid.toLowerCase()
    );
  }

  if (ingredient) {
    const recipeIds = await getRecipeIdsByIngredient(ingredient);

    if (recipeIds.length === 0) {
      return { recipes: [], total: 0, page: pageNumber, totalPages: 0 };
    }

    whereClause.id = { [Op.in]: recipeIds };
  }

  const { rows, count } = await Recipe.findAndCountAll({
    where: whereClause,
    attributes: [
      "id",
      "userid",
      "title",
      "thumb",
      "area",
      "areaid",
      "category",
      "categoryid",
      "description",
    ],
    limit: pageSize,
    offset,
    order: [["id", "DESC"]],
  });

  return {
    recipes: rows,
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
  };
};

export const getRecipeById = async (id) => {
  const recipe = await Recipe.findByPk(id, {
    include: [
      {
        model: RecipeIngredient,
        as: "recipeIngredients",
        attributes: ["measure"],
        include: [
          {
            model: Ingredient,
            as: "ingredient",
            attributes: ["id", "name", "img", "description"],
          },
        ],
      },
    ],
  });

  if (!recipe) {
    const error = new Error("Recipe not found");
    error.status = 404;
    throw error;
  }

  return recipe;
};

export const getPopularRecipes = async ({ page, limit }) => {
  page = Number(page) || 1;
  limit = Number(limit) || 4;
  const offset = (page - 1) * limit;

  const popular = await UserFavorite.findAll({
    attributes: [
      "recipeid",
      [Sequelize.fn("COUNT", Sequelize.col("recipeid")), "favoritesCount"],
    ],
    group: ["recipeid"],
    order: [[Sequelize.fn("COUNT", Sequelize.col("recipeid")), "DESC"]],
    limit: limit,
    offset,
    raw: true,
  });

  const recipeIds = popular.map((p) => p.recipeid);

  const recipes = await Recipe.findAll({
    where: { id: { [Op.in]: recipeIds } },
    attributes: ["id", "userid", "title", "thumb", "description"],
    raw: true,
  });

  const countMap = new Map(
    popular.map((p) => [p.recipeid, Number(p.favoritesCount)])
  );

  const recipesWithFavorites = recipes.map((recipe) => ({
    ...recipe,
    favoritesCount: countMap.get(recipe.id) || 0,
  }));

  return recipesWithFavorites;
};
