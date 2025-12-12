import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserFavorite = sequelize.define(
  "UserFavorite",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_favorites",
    timestamps: false,
  }
);

export default UserFavorite;
