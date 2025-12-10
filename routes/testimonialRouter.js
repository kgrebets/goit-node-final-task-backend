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
 */
testimonialRouter.get("/", testimonialController.getTestimonials);

export default testimonialRouter;
