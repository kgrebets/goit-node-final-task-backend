import categoryService from "../services/categoryService.js";

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export default { getAllCategories };
