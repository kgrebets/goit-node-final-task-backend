import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import Recipe from "./Recipe.js";

const Area = sequelize.define("area", {
  id: { 
    type: DataTypes.STRING, 
    primaryKey: true, 
    autoIncrement: true },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  timestamps: false 
});

Area.hasMany(Recipe, { foreignKey: 'areaid' });

export default Area;
