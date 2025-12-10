import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegExp } from "../constants/authConstants.js";
import UserFollow from "./UserFollow.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already exist",
    },
    validate: {
      is: emailRegExp,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.belongsToMany(User, {
  through: UserFollow,
  as: "Followers",
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  through: UserFollow,
  as: "Following",
  foreignKey: "followerId",
  otherKey: "followingId",
});

export default User;
