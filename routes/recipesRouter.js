import { Router } from "express";
import validateBody from "../helpers/validateBody";
import validateQuery from "../helpers/validateQuery.js";
import { getRecipesController } from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

export default recipesRouter;
