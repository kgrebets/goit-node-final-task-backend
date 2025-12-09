import { Router } from "express";

import {
  registerController,
  verifyController,
  resendVerifyController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  registerSchema,
  emailSchema,
  loginSchema,
} from "../schemas/authSchemas.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
