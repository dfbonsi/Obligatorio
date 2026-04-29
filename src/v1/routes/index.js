import { Router } from "express";
import v1Routes from "./v1.routes.js";

const rutasGenerales = Router();


rutasGenerales.use("/api/v1", v1Routes);


export default rutasGenerales;