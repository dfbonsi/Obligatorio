import express from "express";
import { connectMongo } from "./v1/config/mongo.config.js";
import rutasGenerales from "./v1/routes/index.js";
import { errorMiddleware } from "./v1/middleware/error.middleware.js";
import { rutaNoEncontradaMiddleware } from "./v1/middleware/ruta-no-encontrada.middleware.js";
import xssSanitizer from "./v1/middleware/sanitizer-middleware.mjs";
import cors from "cors";

connectMongo();
const app = express();
const corsOptions = {
    origin: [
            "https://obligatorio-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // solo si usás cookies/sesión
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(express.json());

app.use(xssSanitizer);

app.use(rutasGenerales);
app.use(rutaNoEncontradaMiddleware);
app.use(errorMiddleware);
export default app;