import { Router } from "express";
import validateParams from "../helpers/validateParams.js";
import validateQuery from "../helpers/validateQuery.js";
import {
  getRecipesController,
  getRecipeByIdController,
  getPopularRecipesController,
} from "../controllers/recipesController.js";
import {
  getRecipesSchema,
  getRecipeByIdSchema,
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
 *           example: "6462a6cd4c3d0ddd28897f8f"
 *       - in: query
 *         name: areaid
 *         schema:
 *           type: string
 *           example: "6462a6f04c3d0ddd28897f9b"
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: string
 *           example: "640c2dd963a319ea671e3724"
 *     responses:
 *       200:
 *         description: Paginated list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipesListResponse'
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
 *                 $ref: '#/components/schemas/PopularRecipe'
 */

recipesRouter.get(
  "/popular",
  validateQuery(getPopularRecipesSchema),
  getPopularRecipesController
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
 *           example: "6462a8f74c3d0ddd28897fb8"
 *     responses:
 *       200:
 *         description: Recipe details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */

recipesRouter.get(
  "/:id",
  validateParams(getRecipeByIdSchema),
  getRecipeByIdController
);

export default recipesRouter;
