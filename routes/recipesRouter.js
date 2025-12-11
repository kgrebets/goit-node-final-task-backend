import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import validateQuery from "../helpers/validateQuery.js";
import { getRecipesController } from "../controllers/recipesController.js";
import { getRecipesSchema } from "../schemas/recipesSchemas.js";

const recipesRouter = Router();

recipesRouter.get("/", validateQuery(getRecipesSchema), getRecipesController);

export default recipesRouter;
