import {DateTypes} from 'sequelize';
import {sequelize} from 'sequelize.js';

const UserFavoriteRecipe = sequelize.define('UserFavoriteRecipe', 
    {
        userId: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        recipeId: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'user_favorite_recipes',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'recipeId'],
            },
        ],
    }
);

export default UserFavoriteRecipe;