import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const RecipeIngredient = sequelize.define(
  "RecipeIngredient",
  {
    recipeid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "recipes",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    ingredientid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "ingredients",
        key: "id",
      },
      onDelete: "CASCADE",
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
