import { Router } from "express";

import testimonialController from "../controllers/testimonialsController.js";

const testimonialRouter = Router();

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "647495d0c825f1570b04182d"
 *                   userid:
 *                     type: string
 *                     example: "64c8d958249fae54bae90bb9"
 *                   text:
 *                     type: string
 *                     example: "Some text"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-11T12:18:23.129Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-11T12:18:23.129Z"
 *                   user:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: "Larry Pageim"
 */

testimonialRouter.get("/", testimonialController.getTestimonials);

export default testimonialRouter;
