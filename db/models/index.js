import User from "./User.js";
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

Recipe.belongsTo(User, { foreignKey: "userid", as: "Creator" });
User.hasMany(Recipe, { foreignKey: "userid", as: "Recipes" });

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

export { User, Testimonial, Recipe, RecipeIngredient, Ingredient };
