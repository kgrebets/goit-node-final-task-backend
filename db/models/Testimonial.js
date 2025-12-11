import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Testimonial = sequelize.define("testimonial", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Testimonial;
