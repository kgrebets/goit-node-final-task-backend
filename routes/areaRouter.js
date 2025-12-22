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
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Area unique identifier (ObjectId-like)
 *                     example: "6462a6f04c3d0ddd28897fa5"
 *                   name:
 *                     type: string
 *                     example: "American"
 */

areaRouter.get("/", areaController.getAllAreas);
export default areaRouter;
