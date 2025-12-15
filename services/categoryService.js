import Category from "../db/models/Category.js";

const getAllCategories = async () => {
  return await Category.findAll({ order: [["name", "ASC"]] });
};

export default {
  getAllCategories,
};
