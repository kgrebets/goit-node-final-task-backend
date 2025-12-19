import Category from "../db/models/Category.js";

const getAllCategories = async () => {
  return await Category.findAll({ order: [["name", "ASC"]], raw: true });
};

export default {
  getAllCategories,
};
