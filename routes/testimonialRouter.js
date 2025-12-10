import { Router } from "express";

import testimonialController from "../controllers/testimonialsController.js";

const testimonialRouter = Router();

testimonialRouter.get("/", testimonialController.getTestimonials);

export default testimonialRouter;
