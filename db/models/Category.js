import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
