import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Recipe = sequelize.define(
  "recipe",
  {
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
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    userid: {
      type: DataTypes.STRING,
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
    areaid: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "areas",
        key: "id",
      },
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
  },
  {
    timestamps: false,
  }
);

export default Recipe;
