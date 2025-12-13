import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserFavorite = sequelize.define(
  "UserFavorite",
  {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    recipeid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "user_favorites",
    timestamps: false,
  }
);

export default UserFavorite;
