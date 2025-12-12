import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Area = sequelize.define(
  "area",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// Area.sync({alter: true});

export default Area;
