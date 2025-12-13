import { Recipe, RecipeIngredient, Ingredient } from "../db/models/index.js";
import { Op, Sequelize } from "sequelize";
import Area from "../db/models/Area.js";
import HttpError from "../helpers/HttpError.js";

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

    whereClause.id = { [Op.in]: recipeIds };
  }

  const include = [
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
  ];

  const { rows, count } = await Recipe.findAndCountAll({
    where: whereClause,
    include,
    distinct: true,
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

export const createRecipe = async (recipeData, userId) => {
  let areaid = null;
  if (recipeData.area) {
    let area = await Area.findOne({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        recipeData.area.toLowerCase()
      ),
    });
    if (!area) {
      area = await Area.create({ name: recipeData.area });
    }
    areaid = area.id;
  }

  const recipe = await Recipe.create({
    title: recipeData.title,
    category: recipeData.category,
    categoryid: 1,
    userid: userId,
    area: recipeData.area || null,
    areaid: areaid,
    instructions: recipeData.instructions,
    description: recipeData.description || null,
    thumb: recipeData.thumb || null,
    time: parseInt(recipeData.time, 10) || 0,
  });

  if (recipeData.ingredients?.length) {
    await RecipeIngredient.bulkCreate(
      recipeData.ingredients.map((ing) => ({
        recipeid: String(recipe.id),
        ingredientid: ing.id,
        measure: ing.measure || "",
      }))
    );
  }

  return await Recipe.findByPk(recipe.id, {
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
};

export const deleteRecipe = async (recipeId, userId) => {
  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) throw HttpError(404, "Recipe not found");
  if (recipe.userid !== userId) throw HttpError(403, "You can only delete your own recipes");

  await RecipeIngredient.destroy({
    where: { recipeid: String(recipeId) },
  });
  await Recipe.destroy({ where: { id: recipeId } });
};
