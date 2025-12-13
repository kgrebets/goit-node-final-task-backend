import User from "./User.js";
import UserFavorite from "./UserFavorites.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";
import RecipeIngredient from "./RecipeIngredient.js";
import Ingredient from "./Ingredient.js";

User.hasMany(Testimonial, { foreignKey: "userid", onDelete: "CASCADE" });

User.hasMany(Recipe, {
  foreignKey: "userid",
  sourceKey: "id",
  as: "recipes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Testimonial.belongsTo(User, {
  foreignKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.belongsTo(User, {
  foreignKey: "userid",
  targetKey: "id",
  as: "creator",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.hasMany(RecipeIngredient, {
  foreignKey: "recipeid",
  sourceKey: "id",
  as: "recipeIngredients",
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

export {
  User,
  Testimonial,
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
};
