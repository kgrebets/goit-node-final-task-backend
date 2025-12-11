import express from "express";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";

import notFoundHander from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routes/authRouter.js";
import testimonialRouter from "./routes/testimonialRouter.js";
import userRouter from "./routes/userRouter.js";
import swaggerDocs from "./swagger/swagger.js";





//import User from "./db/models/User.js";
//User.sync({ alter: true });

//import UserFollow from "./db/models/UserFollow.js";
//UserFollow.sync({ alter: true });

//import Testimonial from "./db/models/Testimonial.js";
//Testimonial.sync({ alter: true });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

swaggerDocs(app);

app.use("/api/auth", authRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/users", userRouter);

app.use(notFoundHander);
app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
