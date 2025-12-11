import User from "./User.js";
import Testimonial from "./Testimonial.js";
import Recipe from "./Recipe.js";

User.hasMany(Testimonial, { foreignKey: "userId", onDelete: "CASCADE" });
Testimonial.belongsTo(User, { foreignKey: "userId" });
Recipe.belongsTo(User, { foreignKey: "userId" });

export { User, Testimonial, Recipe };
