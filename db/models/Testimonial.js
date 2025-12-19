import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Testimonial = sequelize.define("testimonial", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },

  userid: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Testimonial;
