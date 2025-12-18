import User from "./User.js";
import UserFavorite from "./UserFavorites.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";
import RecipeIngredient from "./RecipeIngredient.js";
import Ingredient from "./Ingredient.js";
import Category from "./Category.js";
import Area from "./Area.js";

User.hasMany(Testimonial, { foreignKey: "userid", onDelete: "CASCADE" });

User.hasMany(Recipe, {
  foreignKey: "userid",
  sourceKey: "id",
  as: "Recipes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Testimonial.belongsTo(User, {
  foreignKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Ingredient.hasMany(RecipeIngredient, {
  foreignKey: "ingredientid",
  sourceKey: "id",
});

Recipe.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "id",
  as: "Creator",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.hasMany(RecipeIngredient, {
  foreignKey: "recipeid",
  sourceKey: "id",
  as: "recipeIngredients",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

RecipeIngredient.belongsTo(Ingredient, {
  foreignKey: "ingredientid",
  targetKey: "id",
  as: "ingredient",
});

RecipeIngredient.belongsTo(Recipe, {
  foreignKey: "recipeid",
  targetKey: "id",
});

Recipe.hasMany(UserFavorite, {
  foreignKey: "recipeid",
  sourceKey: "id",
  as: "favorites",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserFavorite.belongsTo(Recipe, {
  foreignKey: "recipeid",
  targetKey: "id",
  as: "recipe",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(UserFavorite, {
  foreignKey: "userid",
  sourceKey: "id",
  as: "favorites",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserFavorite.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.belongsTo(Category, {
  foreignKey: "categoryid",
  targetKey: "id",
  as: "category",
});

Recipe.belongsTo(Area, {
  foreignKey: "areaid",
  targetKey: "id",
  as: "area",
});

export {
  User,
  Testimonial,
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
  Category,
  Area,
};
