import User from "./User.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";

User.hasMany(Testimonial, { foreignKey: "userId", onDelete: "CASCADE" });

Testimonial.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Recipe.belongsTo(User, { foreignKey: "userId" });

export { User, Testimonial, Recipe };
