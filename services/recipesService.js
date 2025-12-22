import {
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
  Category,
  Area,
  User,
} from "../db/models/index.js";
import { nanoid } from "nanoid";
import { Sequelize, Op } from "sequelize";
import sequelize from "../db/sequelize.js";
import parseIngredients from "../helpers/parseIngredients.js";
import uploadRecipeThumbToS3 from "../helpers/uploadRecipeThumbToS3.js";

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
  ingredientid,
  userId,
}) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const whereClause = {};

  if (categoryid && categoryid !== "all") whereClause.categoryid = categoryid;
  if (areaid) whereClause.areaid = areaid;

  if (ingredientid) {
    const recipeIds = await getRecipeIdsByIngredient(ingredientid);

    if (recipeIds.length === 0) {
      return { recipes: [], total: 0, page: pageNumber, totalPages: 0 };
    }

    whereClause.id = { [Op.in]: recipeIds };
  }

  const attributes = ["id", "title", "thumb", "description"];

  if (userId) {
    attributes.push([
      sequelize.literal(
        `EXISTS(SELECT 1 FROM user_favorites WHERE recipeid = recipe.id AND userid = :userid)`
      ),
      "isFavorite",
    ]);
  }

  const { rows, count } = await Recipe.findAndCountAll({
    where: whereClause,
    attributes,
    replacements: {
      userid: userId || 0,
    },
    include: [
      { model: User, as: "Creator", attributes: ["id", "username", "avatar"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: Area, as: "area", attributes: ["id", "name"] },
    ],
    limit: pageSize,
    offset,
    order: [["id", "DESC"]],
  });

  return {
    recipes: rows.map((r) => r.toJSON()),
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
  };
};

export const getRecipeById = async (id, userId) => {
  const attributes = [
    "id",
    "title",
    "time",
    "description",
    "instructions",
    "thumb",
  ];

  if (userId) {
    attributes.push([
      sequelize.literal(
        `EXISTS(SELECT 1 FROM user_favorites WHERE recipeid = :recipeid AND userid = :userid)`
      ),
      "isFavorite",
    ]);
  }
  const recipe = await Recipe.findByPk(id, {
    attributes,
    replacements: { recipeid: id, userid: userId || 0 },
    include: [
      { model: User, as: "Creator", attributes: ["id", "username", "avatar"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: Area, as: "area", attributes: ["id", "name"] },
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

export const getPopularRecipes = async ({ page, limit }, userId) => {
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
    limit,
    offset,
    raw: true,
  });

  const recipeIds = popular.map((p) => p.recipeid);

  if (recipeIds.length === 0) {
    return [];
  }

  const attributes = ["id", "title", "thumb", "description"];

  if (userId) {
    attributes.push([
      sequelize.literal(
        `EXISTS(SELECT 1 FROM user_favorites WHERE recipeid = recipe.id AND userid = :userid)`
      ),
      "isFavorite",
    ]);
  }

  const recipes = await Recipe.findAll({
    where: { id: { [Op.in]: recipeIds } },
    attributes,
    replacements: {
      userid: userId || 0,
    },
    include: [
      {
        model: User,
        as: "Creator",
        attributes: ["id", "username", "avatar"],
      },
    ],
  });

  const countMap = new Map(
    popular.map((p) => [p.recipeid, Number(p.favoritesCount)])
  );

  return recipes.map((recipe) => {
    const r = recipe.toJSON();
    return {
      ...r,
      favoritesCount: countMap.get(r.id) || 0,
    };
  });
};

export const createRecipe = async (recipeData, userId, file) => {
  if (!file) {
    throw new Error("THUMB_REQUIRED");
  }

  const ingredients = parseIngredients(recipeData.ingredients);

  if (!recipeData.title) throw new Error("TITLE_REQUIRED");
  if (!recipeData.categoryid) throw new Error("CATEGORY_REQUIRED");
  if (!recipeData.instructions) throw new Error("INSTRUCTIONS_REQUIRED");
  if (
    recipeData.time === undefined ||
    recipeData.time === null ||
    recipeData.time === ""
  ) {
    throw new Error("TIME_REQUIRED");
  }

  const recipeId = await sequelize.transaction(async (t) => {
    const id = nanoid();

    const thumbKey = await uploadRecipeThumbToS3(file, id);

    const recipe = await Recipe.create(
      {
        id,
        userid: userId,
        title: recipeData.title,
        description: recipeData.description ?? "",
        instructions: recipeData.instructions,
        categoryid: recipeData.categoryid,
        areaid: recipeData.areaid ?? null,
        time: recipeData.time,
        thumb: thumbKey,
      },
      { transaction: t }
    );

    const ingredientsPayload = ingredients.map((ing) => ({
      recipeid: recipe.id,
      ingredientid: ing.id,
      measure: ing.measure ?? "",
    }));

    await RecipeIngredient.bulkCreate(ingredientsPayload, { transaction: t });

    return recipe.id;
  });

  return getRecipeById(recipeId, userId);
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
