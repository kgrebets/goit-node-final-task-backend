import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserFollow = sequelize.define(
  "user_follow",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    followingId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["followerId", "followingId"],
      },
    ],
  }
);

export default UserFollow;
