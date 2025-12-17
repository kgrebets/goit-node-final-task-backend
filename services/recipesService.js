import {
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
} from "../db/models/index.js";
import { Sequelize, Op } from "sequelize";
import { nanoid } from "nanoid";
import sequelize from "../db/sequelize.js";

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
      "areaid",
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

export const createRecipe = async (recipeData, userId) => {
  const recipeId = await sequelize.transaction(async (t) => {
    const recipe = await Recipe.create(
      {
        ...recipeData,
        id: nanoid(),
        userid: userId,
      },
      { transaction: t }
    );

    const ingredientsPayload = recipeData.ingredients.map((ing) => ({
      recipeid: recipe.id,
      ingredientid: ing.id,
      measure: ing.measure ?? "",
    }));

    await RecipeIngredient.bulkCreate(ingredientsPayload, {
      transaction: t,
    });

    return recipe.id;
  });

  return await getRecipeById(recipeId);
};

export const deleteRecipe = async (recipeId) => {
  await RecipeIngredient.destroy({
    where: { recipeid: recipeId },
  });
  await Recipe.destroy({ where: { id: recipeId } });
};

export const addToFavorites = async (userId, recipeId) => {
  await UserFavorite.findOrCreate({
    where: { userid: userId, recipeid: recipeId },
  });
};

export const removeFromFavorites = async (userId, recipeId) => {
  const deleted = await UserFavorite.destroy({
    where: { userid: userId, recipeid: recipeId },
  });

  if (!deleted) return false;
  return true;
};

export const getFavoriteRecipes = async (userId, page = 1, limit = 12) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const { rows, count } = await Recipe.findAndCountAll({
    include: [
      {
        model: UserFavorite,
        as: "favorites",
        where: { userid: userId },
        attributes: [],
      },
    ],
    order: [["title", "ASC"]],
    limit: pageSize,
    offset,
    attributes: [
      "id",
      "title",
      "categoryid",
      "areaid",
      "thumb",
      "description",
      "time",
    ],
  });

  return {
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
    results: rows,
  };
};
