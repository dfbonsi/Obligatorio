import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllUserController, updateUserPlanController } from "../controllers/user.controller.js";
import { ROLE } from "../constants/user.constants.js";
import validateRol from "../middleware/roles.middleware.js";
const v1UserRoutes = Router();

v1UserRoutes.get("/", getAllUserController); //esto es publico

v1UserRoutes.use(authMiddleware);
v1UserRoutes.patch("/updateUserPlan",validateRol(ROLE.PROPIETARIO), updateUserPlanController); 
export default v1UserRoutes;


