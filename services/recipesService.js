import Recipe from "../db/models/Recipe.js";
import { Op, Sequelize } from "sequelize";

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
    Sequelize.where(
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
    whereClause.ingredients = {
      [Op.contains]: [{ id: ingredient }],
    };
  }

  const { rows, count } = await Recipe.findAndCountAll({
    where: whereClause,
    limit: pageSize,
    offset: offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    recipes: rows,
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
  };
};
