import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Recipe = sequelize.define("recipe", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instructions: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.JSON,
    allowNull: false,
    // Example:
    //{ "id": "640c2dd963a319ea671e367e", "measure": "175g" },
  },
});

Recipe.sync({ alter: true });

export default Recipe;
