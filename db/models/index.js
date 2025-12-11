import User from "./User.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";
// import Favorite from "./Favorite.js";

User.hasMany(Testimonial, { foreignKey: "userId", onDelete: "CASCADE" });

Testimonial.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.belongsTo(User, { foreignKey: "owner", as: "Creator" });
User.hasMany(Recipe, { foreignKey: "owner", as: "Recipes" });

User.belongsToMany(Recipe, {
  through: Favorite,
  foreignKey: "userId",
  otherKey: "recipeId",
  as: "FavoriteRecipes",
});

Recipe.belongsToMany(User, {
  through: Favorite,
  foreignKey: "recipeId",
  otherKey: "userId",
  as: "FavoritedBy",
});

export { User, Testimonial, Recipe, 
  // Favorite 
 };
