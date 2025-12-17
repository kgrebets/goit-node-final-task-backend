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
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 12
 *       - in: query
 *         name: categoryid
 *         schema:
 *           type: string
 *           example: "6462a6cd4c3d0ddd28897f8d"
 *       - in: query
 *         name: areaid
 *         schema:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897f9b"
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: string
 *           example: "640c2dd963a319ea671e367e"
 *     responses:
 *       200:
 *         description: Paginated list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 289
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
 *                       userid:
 *                         type: string
 *                         example: "zDCBgWYNelFmDgyGR7UC_"
 *                       title:
 *                         type: string
 *                         example: "Integration test recipe"
 *                       thumb:
 *                         type: string
 *                         example: "https://ftp.goit.study/img/so-yummy/preview/Saltfish%20and%20Ackee.jpg"
 *                       areaid:
 *                         type: string
 *                         example: "6462a6f04c3d0ddd28897f9b"
 *                       categoryid:
 *                         type: string
 *                         example: "6462a6cd4c3d0ddd28897f8d"
 *                       description:
 *                         type: string
 *                         example: "Recipe created in integration test"
 */

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

/**
 * @swagger
 * /api/recipes/popular:
 *   get:
 *     summary: Get popular recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       200:
 *         description: List of popular recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "6462a8f74c3d0ddd28898049"
 *                   userid:
 *                     type: string
 *                     example: "64c8d958249fae54bae90bb8"
 *                   title:
 *                     type: string
 *                     example: "Stamppot"
 *                   thumb:
 *                     type: string
 *                     example: "https://ftp.goit.study/img/so-yummy/preview/Stamppot.jpg"
 *                   description:
 *                     type: string
 *                     example: "A traditional Dutch dish made with mashed potatoes and vegetables"
 *                   favoritesCount:
 *                     type: integer
 *                     example: 1
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

recipesRouter.post("/:id/favorite", authenticate, addRecipeToFavoritesController);

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
 *                   example: "6462a8f74c3d0ddd28898049"
 *                 title:
 *                   type: string
 *                   example: "Stamppot"
 *                 categoryid:
 *                   type: string
 *                   example: "6462a6cd4c3d0ddd28897f91"
 *                 userid:
 *                   type: string
 *                   example: "64c8d958249fae54bae90bb8"
 *                 areaid:
 *                   type: string
 *                   example: "6462a6f04c3d0ddd28897fa8"
 *                 instructions:
 *                   type: string
 *                   example: "Wash and peel the potatoes..."
 *                 description:
 *                   type: string
 *                   example: "A traditional Dutch dish made with mashed potatoes and vegetables..."
 *                 thumb:
 *                   type: string
 *                   example: "https://ftp.goit.study/img/so-yummy/preview/Stamppot.jpg"
 *                 time:
 *                   type: integer
 *                   example: 40
 *                 recipeIngredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       measure:
 *                         type: string
 *                         example: "1.5kg"
 *                       ingredient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "640c2dd963a319ea671e3746"
 *                           name:
 *                             type: string
 *                             example: "Potatoes"
 *                           img:
 *                             type: string
 *                             example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3746.png"
 *                           description:
 *                             type: string
 *                             example: "A starchy root vegetable..."
 *       404:
 *         description: Recipe not found
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
