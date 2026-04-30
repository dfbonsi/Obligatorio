import express from "express";
import { connectMongo } from "./v1/config/mongo.config.js";
import rutasGenerales from "./v1/routes/index.js";
import { errorMiddleware } from "./v1/middleware/error.middleware.js";
import { rutaNoEncontradaMiddleware } from "./v1/middleware/ruta-no-encontrada.middleware.js";
import xssSanitizer from "./v1/middleware/sanitizer-middleware.mjs";

connectMongo();
const app = express();

app.use(express.json());

app.use(xssSanitizer);

app.use(rutasGenerales);
app.use(rutaNoEncontradaMiddleware);
app.use(errorMiddleware);
export default app;