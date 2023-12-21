import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsViewRouter from "./routes/productsView.router.js";
import cartsViewRouter from "./routes/cartsView.router.js";
import userViewRouter from "./routes/userView.router.js";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/user.router.js";
import mockingRouter from "./routes/mocking.router.js";
import loggerRouter from "./routes/logger.router.js";
import errorHandler from "./middlewares/errors/index.js";
import config from "./config/config.js";
import { addLogger } from "./util/logger/custom.logger.js";
import recoveryRouter from "./routes/recovery.router.js";
import recoveryViewRouter from "./routes/recoveryView.router.js";
import permisionsRouter from "./routes/permisions.router.js";
import specs from "./config/swagger.config.js";
import swaggerUiExpress from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(cookieParser());
app.use(addLogger);
initPassport();
app.use(passport.initialize());

// Docs

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

try {
  const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB}`;
  await mongoose.connect(db);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}
// Routers
app.use("/", userViewRouter);
app.use("/", mockingRouter);
app.use("/", loggerRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewRouter);
app.use("/carts", cartsViewRouter);
app.use("/api/recovery", recoveryRouter);
app.use("/", recoveryViewRouter);
app.use("/api/users", permisionsRouter);
app.use(errorHandler);
const port = config.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
