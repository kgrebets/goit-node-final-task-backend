import { Router } from "express";
import validateParams from "../helpers/validateParams.js";
import validateQuery from "../helpers/validateQuery.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import {
  getRecipesController,
  getRecipeByIdController,
  createRecipeController,
  deleteRecipeController,
  getPopularRecipesController,
  getFavoriteRecipesController,
  addRecipeToFavoritesController,
  removeRecipeFromFavoritesController,
} from "../controllers/recipesController.js";
import {
  getRecipesSchema,
  getRecipeByIdSchema,
  createRecipeSchema,
  deleteRecipeSchema,
  getPopularRecipesSchema,
} from "../schemas/recipesSchemas.js";

const recipesRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipes endpoints
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get list of recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Page number (starts from 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 12
 *         description: Items per page
 *       - in: query
 *         name: categoryid
 *         schema:
 *           type: string
 *           example: "6462a6cd4c3d0ddd28897f8d"
 *         description: Category ID to filter recipes
 *       - in: query
 *         name: areaid
 *         schema:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897fa3"
 *         description: Area ID to filter recipes
 *       - in: query
 *         name: ingredientid
 *         schema:
 *           type: string
 *           example: "640c2dd963a319ea671e3664"
 *         description: Ingredient ID to filter recipes
 *     responses:
 *       200:
 *         description: Paginated list of recipes (can be empty)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 4
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "6462a8f74c3d0ddd288980b8"
 *                       title:
 *                         type: string
 *                         example: "Chicken Marengo"
 *                       time:
 *                         type: integer
 *                         description: Cooking time in minutes
 *                         example: 45
 *                       thumb:
 *                         type: string
 *                         nullable: true
 *                         example: "https://ftp.goit.study/img/so-yummy/preview/Chicken%20Marengo.jpg"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "A classic French chicken dish made with sautéed chicken in a tomato and wine sauce, served with mushrooms and olives."
 *                       Creator:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                           username:
 *                             type: string
 *                             example: "Darya"
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                       category:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "6462a6cd4c3d0ddd28897f8d"
 *                           name:
 *                             type: string
 *                             example: "Chicken"
 *                       area:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "6462a6f04c3d0ddd28897fa3"
 *                           name:
 *                             type: string
 *                             example: "French"
 *             examples:
 *               success:
 *                 summary: Recipes found
 *                 value:
 *                   total: 4
 *                   page: 1
 *                   totalPages: 1
 *                   results:
 *                     - id: "6462a8f74c3d0ddd288980b8"
 *                       title: "Chicken Marengo"
 *                       time: 45
 *                       thumb: "https://ftp.goit.study/img/so-yummy/preview/Chicken%20Marengo.jpg"
 *                       description: "A classic French chicken dish made with sautéed chicken in a tomato and wine sauce, served with mushrooms and olives."
 *                       Creator:
 *                         id: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                         username: "Darya"
 *                         avatar: null
 *                       category:
 *                         id: "6462a6cd4c3d0ddd28897f8d"
 *                         name: "Chicken"
 *                       area:
 *                         id: "6462a6f04c3d0ddd28897fa3"
 *                         name: "French"
 *               empty:
 *                 summary: No recipes match the filters
 *                 value:
 *                   total: 0
 *                   page: 1
 *                   totalPages: 0
 *                   results: []
 */

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

/**
 * @swagger
 * /api/recipes/popular:
 *   get:
 *     summary: Get popular recipes (most favorited)
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Page number (starts from 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 4
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of popular recipes ordered by favorites count (can be empty)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "6462a8f74c3d0ddd28897fe0"
 *                   title:
 *                     type: string
 *                     example: "Ribollita"
 *                   thumb:
 *                     type: string
 *                     nullable: true
 *                     example: "https://ftp.goit.study/img/so-yummy/preview/Ribollita.jpg"
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     example: "A Tuscan soup made with vegetables, bread, and beans, often served as a hearty main dish."
 *                   Creator:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                       username:
 *                         type: string
 *                         example: "Darya"
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                   favoritesCount:
 *                     type: integer
 *                     example: 1
 *             examples:
 *               success:
 *                 summary: Popular recipes
 *                 value:
 *                   - id: "6462a8f74c3d0ddd28897fe0"
 *                     title: "Ribollita"
 *                     thumb: "https://ftp.goit.study/img/so-yummy/preview/Ribollita.jpg"
 *                     description: "A Tuscan soup made with vegetables, bread, and beans, often served as a hearty main dish."
 *                     Creator:
 *                       id: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                       username: "Darya"
 *                       avatar: null
 *                     favoritesCount: 1
 *                   - id: "6462a8f74c3d0ddd28897fe3"
 *                     title: "Full English Breakfast"
 *                     thumb: "recipes/6462a8f74c3d0ddd28897fe3/7306eb16ad5fd41b3eaff054b6768ede2fac6a40ad36e005346e766f6463963c.webp"
 *                     description: "Similar to the English Breakfast, but with additional items like black pudding, fried mushrooms, and hash browns. It is a more substantial breakfast meal."
 *                     Creator:
 *                       id: "wh8ghsPfXj_QSIowtir9_"
 *                       username: "johndoe"
 *                       avatar: null
 *                     favoritesCount: 1
 *               empty:
 *                 summary: No popular recipes yet
 *                 value: []
 */

recipesRouter.get(
  "/popular",
  validateQuery(getPopularRecipesSchema),
  getPopularRecipesController
);

/**
 * @swagger
 * /api/recipes/favorites:
 *   get:
 *     summary: Get favorite recipes of the authenticated user
 *     description: Returns a paginated list of recipes added to favorites by the authenticated user
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 12
 *         description: Number of recipes per page
 *     responses:
 *       200:
 *         description: Paginated list of favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "Lcr2qK0ukWY3o7pQRn3lf"
 *                       title:
 *                         type: string
 *                         example: "Integration test recipe"
 *                       categoryid:
 *                         type: string
 *                         example: "6462a6cd4c3d0ddd28897f8d"
 *                       areaid:
 *                         type: string
 *                         example: "6462a6f04c3d0ddd28897f9b"
 *                       thumb:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       time:
 *                         type: integer
 *                         example: 45
 *       401:
 *         description: Unauthorized
 */

recipesRouter.get("/favorites", authenticate, getFavoriteRecipesController);

/**
 * @swagger
 * /api/recipes/{id}/favorite:
 *   post:
 *     summary: Add recipe to favorites
 *     description: Adds the specified recipe to the authenticated user's favorites list
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       201:
 *         description: Recipe successfully added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe added to favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */

recipesRouter.post(
  "/:id/favorite",
  authenticate,
  addRecipeToFavoritesController
);

/**
 * @swagger
 * /api/recipes/{id}/favorite:
 *   delete:
 *     summary: Remove recipe from favorites
 *     description: Removes the specified recipe from the authenticated user's favorites list
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe successfully removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe removed from favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found in favorites
 */

recipesRouter.delete(
  "/:id/favorite",
  authenticate,
  removeRecipeFromFavoritesController
);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6462a8f74c3d0ddd28897fe3"
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6462a8f74c3d0ddd28897fe3"
 *                 title:
 *                   type: string
 *                   example: "Full English Breakfast"
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   example: "Similar to the English Breakfast, but with additional items like black pudding, fried mushrooms, and hash browns. It is a more substantial breakfast meal."
 *                 instructions:
 *                   type: string
 *                   example: "Heat the flat grill plate over a low heat..."
 *                 thumb:
 *                   type: string
 *                   nullable: true
 *                   example: "recipes/6462a8f74c3d0ddd28897fe3/7306eb16ad5fd41b3eaff054b6768ede2fac6a40ad36e005346e766f6463963c.webp"
 *                 Creator:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "wh8ghsPfXj_QSIowtir9_"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 category:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6462a6cd4c3d0ddd28897f95"
 *                     name:
 *                       type: string
 *                       example: "Breakfast"
 *                 area:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6462a6f04c3d0ddd28897fa1"
 *                     name:
 *                       type: string
 *                       example: "British"
 *                 recipeIngredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       measure:
 *                         type: string
 *                         nullable: true
 *                         example: "4"
 *                       ingredient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "640c2dd963a319ea671e3664"
 *                           name:
 *                             type: string
 *                             example: "Bacon"
 *                           img:
 *                             type: string
 *                             nullable: true
 *                             example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3664.png"
 *                           description:
 *                             type: string
 *                             nullable: true
 *                             example: "Bacon is a type of salt-cured pork..."
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recipe not found"
 */

recipesRouter.get(
  "/:id",
  validateParams(getRecipeByIdSchema),
  getRecipeByIdController
);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - categoryid
 *               - instructions
 *               - time
 *               - ingredients
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My sweet recipe"
 *               categoryid:
 *                 type: string
 *                 example: "6462a6cd4c3d0ddd28897f8d"
 *               areaid:
 *                 type: string
 *                 example: "6462a6f04c3d0ddd28897f9b"
 *               instructions:
 *                 type: string
 *                 example: "Mix everything and cook"
 *               description:
 *                 type: string
 *                 example: "YOu won't believe how sweet this is!"
 *               thumb:
 *                 type: string
 *                 example: "https://ftp.goit.study/img/so-yummy/preview/Saltfish%20and%20Ackee.jpg"
 *               time:
 *                 type: integer
 *                 example: 45
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "640c2dd963a319ea671e367e"
 *                     measure:
 *                       type: string
 *                       example: "333 g"
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 categoryid:
 *                   type: string
 *                 userid:
 *                   type: string
 *                 areaid:
 *                   type: string
 *                 instructions:
 *                   type: string
 *                 description:
 *                   type: string
 *                 thumb:
 *                   type: string
 *                 time:
 *                   type: integer
 *                 recipeIngredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       measure:
 *                         type: string
 *                       ingredient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           img:
 *                             type: string
 *                           description:
 *                             type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

recipesRouter.post(
  "/",
  authenticate,
  validateBody(createRecipeSchema),
  createRecipeController
);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       403:
 *         description: You can only delete your own recipes
 *       404:
 *         description: Recipe not found
 *       401:
 *         description: Unauthorized
 */

recipesRouter.delete(
  "/:id",
  authenticate,
  validateParams(deleteRecipeSchema),
  deleteRecipeController
);

export default recipesRouter;
