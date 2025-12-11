import { Router } from "express";
import areaController from "../controllers/areaController.js";

const areaRouter = Router();


/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Get all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: List of areas
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
 *                     example: "American"
 */

areaRouter.get("/", areaController.getAllAreas);
export default areaRouter;