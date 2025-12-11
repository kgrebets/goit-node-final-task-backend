import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const RecipeIngredient = sequelize.define(
  "RecipeIngredient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredientid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "recipe_ingredients",
    timestamps: false,
  }
);

export default RecipeIngredient;
