import { Ingredient } from "../db/models/index.js";
import { Sequelize } from "sequelize";

export const getAllIngredients = async ({ page, limit, name }) => {
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const offset = (pageNumber - 1) * pageSize;

  const whereClause = {};

  if (name) {
    whereClause.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLowerCase()}%`
    );
  }

  const { rows, count } = await Ingredient.findAndCountAll({
    where: whereClause,
    order: [["name", "ASC"]],
    limit: pageSize,
    offset,
  });

  const results = rows.map((ingredient) => ({
    _id: ingredient.id,
    name: ingredient.name,
    desc: ingredient.description || "",
    img: ingredient.img || "",
  }));

  return {
    total: count,
    page: pageNumber,
    totalPages: Math.ceil(count / pageSize),
    results,
  };
};

