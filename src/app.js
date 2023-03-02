import express from "express";
import bodyparser from "body-parser";
import "express-async-errors";
import { userRouter } from "./routes/PublicRoutes.js";
import { errorHandler } from "./middleware/ErrorHandler.js";
import UrlNotFoundError from "./errors/UrlNotFound.js";
import { SignInRouter } from "./routes/SignInRoute.js";
import { ProtectedRoutes } from "./routes/ProtectedRoute.js";
import { ImageRouter } from "./routes/ProductProtectedImageRoute.js";

const app = express();

app.use(bodyparser.json());

app.use(userRouter);

app.use(SignInRouter);

app.use(ProtectedRoutes);

app.use(ImageRouter);

app.all("*", async (req) => {
  throw new UrlNotFoundError(`Path Not found: ${req.url}`);
});

// Middlewares
app.use(errorHandler);

export { app };
