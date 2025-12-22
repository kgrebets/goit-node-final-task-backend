import { Router } from "express";
import upload from "../middlewares/upload.js";
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
  createRecipeBodySchema,
  deleteRecipeSchema,
  getPopularRecipesSchema,
} from "../schemas/recipesSchemas.js";
import optionalAuthenticate from "../middlewares/optionalAuthenticate.js";

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
 *     security:
 *       - bearerAuth: []
 *       - {}
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
 *                   example: 290
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 25
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
 *                       time:
 *                         type: integer
 *                         description: Cooking time in minutes
 *                         example: 45
 *                       thumb:
 *                         type: string
 *                         nullable: true
 *                         example: "https://ftp.goit.study/img/so-yummy/preview/Saltfish%20and%20Ackee.jpg"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "Recipe created in integration test"
 *                       isFavorite:
 *                         type: boolean
 *                         nullable: true
 *                         description: Flag whether recipe is in the user's favorites. Appears only for authenticated users.
 *                         example: false
 *                       Creator:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "zDCBgWYNelFmDgyGR7UC_"
 *                           username:
 *                             type: string
 *                             example: "user-1765553053360"
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
 *                             example: "6462a6f04c3d0ddd28897f9b"
 *                           name:
 *                             type: string
 *                             example: "Ukrainian"
 *             examples:
 *               success:
 *                 summary: Recipes found
 *                 value:
 *                   total: 290
 *                   page: 1
 *                   totalPages: 25
 *                   results:
 *                     - id: "Lcr2qK0ukWY3o7pQRn3lf"
 *                       title: "Integration test recipe"
 *                       thumb: "https://ftp.goit.study/img/so-yummy/preview/Saltfish%20and%20Ackee.jpg"
 *                       description: "Recipe created in integration test"
 *                       isFavorite: false
 *                       Creator:
 *                         id: "zDCBgWYNelFmDgyGR7UC_"
 *                         username: "user-1765553053360"
 *                         avatar: null
 *                       category:
 *                         id: "6462a6cd4c3d0ddd28897f8d"
 *                         name: "Chicken"
 *                       area:
 *                         id: "6462a6f04c3d0ddd28897f9b"
 *                         name: "Ukrainian"
 *               empty:
 *                 summary: No recipes match the filters
 *                 value:
 *                   total: 0
 *                   page: 1
 *                   totalPages: 0
 *                   results: []
 */

recipesRouter.get(
  "/",
  validateQuery(getRecipesSchema),
  optionalAuthenticate,
  getRecipesController
);

/**
 * @swagger
 * /api/recipes/popular:
 *   get:
 *     summary: Get popular recipes (most favorited)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *       - {}
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
 *                     example: "6462a8f74c3d0ddd28897fe6"
 *                   title:
 *                     type: string
 *                     example: "Recheado Masala Fish"
 *                   thumb:
 *                     type: string
 *                     nullable: true
 *                     example: "https://ftp.goit.study/img/so-yummy/preview/Recheado%20Masala%20Fish.jpg"
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     example: "A Goan specialty of fish marinated with a spicy masala paste and fried or grilled to perfection."
 *                   isFavorite:
 *                     type: boolean
 *                     nullable: true
 *                     description: Flag whether recipe is in the user's favorites. Appears only for authenticated users.
 *                     example: false
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
 *                   - id: "6462a8f74c3d0ddd28897fe6"
 *                     title: "Recheado Masala Fish"
 *                     thumb: "https://ftp.goit.study/img/so-yummy/preview/Recheado%20Masala%20Fish.jpg"
 *                     description: "A Goan specialty of fish marinated with a spicy masala paste and fried or grilled to perfection."
 *                     isFavorite: false
 *                     Creator:
 *                       id: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                       username: "Darya"
 *                       avatar: null
 *                     favoritesCount: 1
 *                   - id: "6462a8f74c3d0ddd28897fe8"
 *                     title: "Katsu Chicken curry"
 *                     thumb: "https://ftp.goit.study/img/so-yummy/preview/Katsu%20Chicken%20curry.jpg"
 *                     description: "Japanese-style curry with breaded chicken"
 *                     isFavorite: true
 *                     Creator:
 *                       id: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                       username: "Darya"
 *                       avatar: null
 *                     favoritesCount: 2
 *               empty:
 *                 summary: No popular recipes yet
 *                 value: []
 */

recipesRouter.get(
  "/popular",
  validateQuery(getPopularRecipesSchema),
  optionalAuthenticate,
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
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6462a8f74c3d0ddd288980d1"
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
 *                   example: "6462a8f74c3d0ddd288980d1"
 *                 title:
 *                   type: string
 *                   example: "Shakshuka"
 *                 time:
 *                   type: integer
 *                   example: 25
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   example: "A popular Middle Eastern dish with eggs poached in a spicy tomato sauce..."
 *                 instructions:
 *                   type: string
 *                   example: "Heat the oil in a frying pan that has a lid..."
 *                 thumb:
 *                   type: string
 *                   nullable: true
 *                   example: "https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg"
 *                 isFavorite:
 *                   type: boolean
 *                   nullable: true
 *                   description: Flag whether recipe is in the user's favorites. Appears only for authenticated users.
 *                   example: true
 *                 Creator:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                     username:
 *                       type: string
 *                       example: "Darya"
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
 *                       example: "6462a6cd4c3d0ddd28897f92"
 *                     name:
 *                       type: string
 *                       example: "Vegetarian"
 *                 area:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6462a6f04c3d0ddd28897fb1"
 *                     name:
 *                       type: string
 *                       example: "Egyptian"
 *                 recipeIngredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       measure:
 *                         type: string
 *                         nullable: true
 *                         example: "1 tbs"
 *                       ingredient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "640c2dd963a319ea671e372c"
 *                           name:
 *                             type: string
 *                             example: "Olive Oil"
 *                           img:
 *                             type: string
 *                             nullable: true
 *                             example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png"
 *                           description:
 *                             type: string
 *                             nullable: true
 *                             example: "A type of oil made from pressing whole olives..."
 *             examples:
 *               success:
 *                 summary: Recipe details
 *                 value:
 *                   id: "6462a8f74c3d0ddd288980d1"
 *                   title: "Shakshuka"
 *                   time: 25
 *                   description: "A popular Middle Eastern dish with eggs poached in a spicy tomato sauce..."
 *                   instructions: "Heat the oil in a frying pan that has a lid..."
 *                   thumb: "https://ftp.goit.study/img/so-yummy/preview/Shakshuka.jpg"
 *                   isFavorite: true
 *                   Creator:
 *                     id: "n-QaIbsY-Gk9Ggee4eGQ-"
 *                     username: "Darya"
 *                     avatar: null
 *                   category:
 *                     id: "6462a6cd4c3d0ddd28897f92"
 *                     name: "Vegetarian"
 *                   area:
 *                     id: "6462a6f04c3d0ddd28897fb1"
 *                     name: "Egyptian"
 *                   recipeIngredients:
 *                     - measure: "1 tbs"
 *                       ingredient:
 *                         id: "640c2dd963a319ea671e372c"
 *                         name: "Olive Oil"
 *                         img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e372c.png"
 *                         description: "A type of oil made from pressing whole olives..."
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
  optionalAuthenticate,
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - categoryid
 *               - areaid
 *               - instructions
 *               - description
 *               - time
 *               - ingredients
 *               - thumb
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Valeriia Recipe"
 *               categoryid:
 *                 type: string
 *                 description: Category id
 *                 example: "6462a6cd4c3d0ddd28897f8d"
 *               areaid:
 *                 type: string
 *                 description: Area id
 *                 example: "6462a6f04c3d0ddd28897f9b"
 *               instructions:
 *                 type: string
 *                 example: "Mix and cook"
 *               description:
 *                 type: string
 *                 example: "Test Description"
 *               time:
 *                 oneOf:
 *                   - type: integer
 *                     example: 10
 *                   - type: string
 *                     example: "10"
 *               ingredients:
 *                 type: string
 *                 description: JSON string of ingredients array (because multipart/form-data)
 *                 example: '[{"id":"640c2dd963a319ea671e367e","measure":"200 g"}]'
 *               thumb:
 *                 type: string
 *                 format: binary
 *                 description: Recipe image file
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - title
 *                 - time
 *                 - description
 *                 - instructions
 *                 - thumb
 *                 - isFavorite
 *                 - Creator
 *                 - category
 *                 - area
 *                 - recipeIngredients
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "tEP12db2hCtYSmRYpKufN"
 *                 title:
 *                   type: string
 *                   example: "Valeriia Recipe"
 *                 time:
 *                   type: integer
 *                   example: 10
 *                 description:
 *                   type: string
 *                   example: "Test Description"
 *                 instructions:
 *                   type: string
 *                   example: "Mix and cook"
 *                 thumb:
 *                   type: string
 *                   example: "recipes/tEP12db2hCtYSmRYpKufN/mock-thumb.webp"
 *                 isFavorite:
 *                   type: boolean
 *                   example: false
 *                 Creator:
 *                   type: object
 *                   required: [id, username, avatar]
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "X4Tb2ICHsduumTIRpcpcB"
 *                     username:
 *                       type: string
 *                       example: "Valeriia"
 *                     avatar:
 *                       type: string
 *                       example: "avatars/X4Tb2ICHsduumTIRpcpcB/72e649f0ff7e5cde05d1b6c2635fa0fe1415af2998aa79b64b7380516f5b6d6f"
 *                 category:
 *                   type: object
 *                   required: [id, name]
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6462a6cd4c3d0ddd28897f8d"
 *                     name:
 *                       type: string
 *                       example: "Chicken"
 *                 area:
 *                   type: object
 *                   required: [id, name]
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "6462a6f04c3d0ddd28897f9b"
 *                     name:
 *                       type: string
 *                       example: "Ukrainian"
 *                 recipeIngredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required: [measure, ingredient]
 *                     properties:
 *                       measure:
 *                         type: string
 *                         example: "200 g"
 *                       ingredient:
 *                         type: object
 *                         required: [id, name, img, description]
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "640c2dd963a319ea671e367e"
 *                           name:
 *                             type: string
 *                             example: "Butter"
 *                           img:
 *                             type: string
 *                             example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e367e.png"
 *                           description:
 *                             type: string
 *                             example: "A dairy product made from churning cream or milk, with a high fat content and a creamy, rich flavor that is often used in cooking and baking."
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

recipesRouter.post(
  "/",
  authenticate,
  upload.single("thumb"),
  validateBody(createRecipeBodySchema),
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
