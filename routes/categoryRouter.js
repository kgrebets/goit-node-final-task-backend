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
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Category unique identifier (ObjectId-like)
 *                     example: "6462a6cd4c3d0ddd28897f8e"
 *                   name:
 *                     type: string
 *                     example: "Beef"
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     example: "Rich, bold, and perfectly composed—indulgent recipes that celebrate depth of flavor and timeless culinary confidence."
 */

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;
