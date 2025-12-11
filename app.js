import express from "express";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";
import notFoundHander from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routes/authRouter.js";
import areaRouter from "./routes/areaRouter.js";
import testimonialRouter from "./routes/testimonialRouter.js";
import recipesRouter from "./routes/recipesRouter.js";
import swaggerDocs from "./swagger/swagger.js";

// import User from "./db/models/User.js";
// import Testimonial from "./db/models/Testimonial.js";
// import Recipe from "./db/models/Recipe.js";

// User.sync({ alter: true });
// Testimonial.sync({ alter: true });
// Recipe.sync({ alter: true });
import userRouter from "./routes/userRouter.js";

//import User from "./db/models/User.js";
//User.sync({ alter: true });

//import UserFollow from "./db/models/UserFollow.js";
//UserFollow.sync({ alter: true });

//import Testimonial from "./db/models/Testimonial.js";
//Testimonial.sync({ alter: true });

// import Area from "./db/models/Area.js";
// await Area.sync({ alter: true });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

swaggerDocs(app);

app.use("/api/auth", authRouter);
app.use("/api/areas", areaRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/users", userRouter);
app.use(notFoundHander);

app.use(notFoundHander);
app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
