import { Router } from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Recipe categories endpoints
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all recipe categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of recipe categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Beef"
 */

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;
