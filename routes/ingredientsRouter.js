import { Router } from "express";
import validateQuery from "../helpers/validateQuery.js";
import { getAllIngredientsController } from "../controllers/ingredientsController.js";
import { getIngredientsSchema } from "../schemas/ingredientsSchemas.js";

const ingredientsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredients endpoints
 */

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get list of ingredients
 *     tags: [Ingredients]
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
 *         name: name
 *         schema:
 *           type: string
 *           example: "Tomato"
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 2871
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 240
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "640c2dd963a319ea671e37aa"
 *                       name:
 *                         type: string
 *                         example: "Squid"
 *                       desc:
 *                         type: string
 *                         example: "A type of cephalopod..."
 *                       img:
 *                         type: string
 *                         example: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png"
 */
ingredientsRouter.get(
  "/",
  validateQuery(getIngredientsSchema),
  getAllIngredientsController
);

export default ingredientsRouter;
