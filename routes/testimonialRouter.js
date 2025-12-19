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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 647495d0c825f1570b04182d
 *                 userid:
 *                   type: string
 *                   example: DidcfuqEB9sjaq98gJ8ik
 *                 text:
 *                   type: string
 *                   example: Some text
 *                 createdAt:
 *                   type: string
 *                   example: 2025-12-18T16:36:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   example: 2025-12-18T16:36:00.000Z
 *                 user:
 *                   type: object
 *                   nullable: false
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "Darya"
 */
testimonialRouter.get("/", testimonialController.getTestimonials);

export default testimonialRouter;
