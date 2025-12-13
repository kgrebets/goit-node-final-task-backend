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
} from "../controllers/recipesController.js";
import {
  getRecipesSchema,
  getRecipeByIdSchema,
  createRecipeSchema,
  deleteRecipeSchema,
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
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: Beef
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *           example: Italian
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: string
 *           example: Tomato
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 120
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 12
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RecipePreview'
 */
recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64c8d958249fae54bae90bb7
 *     responses:
 *       200:
 *         description: Recipe details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDetails'
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
 *               - category
 *               - instructions
 *               - time
 *               - ingredients
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Battenberg Cake"
 *               category:
 *                 type: string
 *                 example: "Dessert"
 *               area:
 *                 type: string
 *                 example: "British"
 *               instructions:
 *                 type: string
 *                 example: "Heat oven to 180C..."
 *               description:
 *                 type: string
 *                 example: "A classic British cake..."
 *               thumb:
 *                 type: string
 *                 example: "https://ftp.goit.study/img/so-yummy/preview/Battenberg%20Cake.jpg"
 *               time:
 *                 type: string
 *                 example: "60"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "640c2dd963a319ea671e367e"
 *                     measure:
 *                       type: string
 *                       example: "175g"
 *     responses:
 *       201:
 *         description: Recipe created successfully
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
 *         example: "1"
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
