import User from "./User.js";
import UserFavorite from "./UserFavorites.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";
import RecipeIngredient from "./RecipeIngredient.js";
import Ingredient from "./Ingredient.js";

User.hasMany(Testimonial, { foreignKey: "userid", onDelete: "CASCADE" });

Testimonial.belongsTo(User, {
  foreignKey: "userid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.belongsTo(User, { foreignKey: "userid" });

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

Recipe.hasMany(UserFavorite, {
  foreignKey: "recipeid",
  sourceKey: "id",
  as: "favorites",
});

UserFavorite.belongsTo(Recipe, {
  foreignKey: "recipeid",
  targetKey: "id",
});

User.hasMany(UserFavorite, { foreignKey: "userid", onDelete: "CASCADE" });
UserFavorite.belongsTo(User, { foreignKey: "userid" });

export {
  User,
  Testimonial,
  Recipe,
  RecipeIngredient,
  Ingredient,
  UserFavorite,
};
