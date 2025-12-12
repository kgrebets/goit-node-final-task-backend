import { Router } from "express";
import validateParams from "../helpers/validateParams.js";
import validateQuery from "../helpers/validateQuery.js";
import authenticate from "../middlewares/authenticate.js";

import {
  getRecipesController,
  getRecipeByIdController,
  addFavoriteRecipeController,
  removeFavoriteRecipeController,
  getUserFavoriteRecipesController,
} from "../controllers/recipesController.js";
import {
  getRecipesSchema,
  getRecipeByIdSchema,
} from "../schemas/recipesSchemas.js";

const recipesRouter = Router();

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

recipesRouter.get(
  "/:id",
  validateParams(getRecipeByIdSchema),
  getRecipeByIdController
);

recipesRouter.post(
  "/favorites/recipeId",
  authenticate,
  addFavoriteRecipeController
);

recipesRouter.delete(
  "/favorites/recipeId",
  authenticate,
  removeFavoriteRecipeController
);

recipesRouter.get(
  "/favorites",
  authenticate,
  getUserFavoriteRecipesController
);  

export default recipesRouter;
