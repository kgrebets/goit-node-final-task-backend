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
  category,
  area,
  ingredient,
}) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const whereClause = {};

  if (category) {
    whereClause.category = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("category")),
      category.toLowerCase()
    );
  }

  if (area) {
    whereClause.area = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("area")),
      area.toLowerCase()
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
    attributes: ["id", "userid", "title", "thumb", "description"],
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
  const offset = (page - 1) * limit;
};
