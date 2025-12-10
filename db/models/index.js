import User from "./User.js";
import Testimonial from "./Testimonial.js";

User.hasMany(Testimonial, { foreignKey: "userId", onDelete: "CASCADE" });
Testimonial.belongsTo(User, { foreignKey: "userId" });

export { User, Testimonial };
