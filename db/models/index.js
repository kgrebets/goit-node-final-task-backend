import User from "./User.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";
import RecipeIngredient from "./RecipeIngredient.js";
import Ingredient from "./Ingredient.js";
import UserFavoriteRecipe from "./UserFavoriteRecipe.js";
import { on } from "nodemailer/lib/xoauth2/index.js";
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

User.hasMany(UserFavoriteRecipe, {
  foreignKey: "userId", onDelete: "CASCADE" 
});

UserFavoriteRecipe.belongsTo(User, {
  foreignKey: "userId"
});

Recipe.hasMany(UserFavoriteRecipe, {
  foreignKey: "recipeId",
   onDelete: "CASCADE",
   onUpdate: "CASCADE"
});

UserFavoriteRecipe.belongsTo(Recipe, {
  foreignKey: "recipeId"
});


export { User, Testimonial, Recipe, RecipeIngredient, Ingredient, UserFavoriteRecipe };
