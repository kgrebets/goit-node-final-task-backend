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

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

recipesRouter.get(
  "/:id",
  validateParams(getRecipeByIdSchema),
  getRecipeByIdController
);

recipesRouter.get(
  "/popular",
  validateQuery(getPopularRecipesSchema),
  getPopularRecipesController
);

export default recipesRouter;
