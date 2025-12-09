import { DataTypes } from "sequelize";

import sequalize from "../sequelize.js";

import { emailRegExp } from "../constants/authConstants.js";

const User = sequalize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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

// User.sync({alter: true});

export default User;
