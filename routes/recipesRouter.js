import { Router } from "express";
import validateParams from "../helpers/validateParams.js";
import validateQuery from "../helpers/validateQuery.js";
import {
  getRecipesController,
  getRecipeByIdController,
} from "../controllers/recipesController.js";
import {
  getRecipesSchema,
  getRecipeByIdSchema,
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

export default recipesRouter;
