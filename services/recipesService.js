import Recipe from "../models/Recipe.js";
import { Op } from "sequelize";

export const getRecipesService = async ({
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
    whereClause.category = category;
  }

  if (area) {
    whereClause.area = area;
  }

  if (ingredient) {
    whereClause.ingredients = {
      [Op.like]: `%${ingredient}%`,
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
