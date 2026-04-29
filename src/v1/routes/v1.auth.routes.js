import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { validateBodyLogin, validateBodyCreate } from "../middleware/user.validate.middleware.js";
const v1AuthRoutes = Router();


v1AuthRoutes.post("/register", validateBodyCreate, registerController);

v1AuthRoutes.post("/login", validateBodyLogin, loginController); 

export default v1AuthRoutes;