import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllUserController, updateUserPlanController } from "../controllers/user.controller.js";
import { ROLE, ROLES } from "../constants/user.constants.js";
import validateRol from "../middleware/roles.middleware.js";
const v1UserRoutes = Router();

v1UserRoutes.get("/roles",(req, res) => { res.json(ROLES) } );
v1UserRoutes.use(authMiddleware);
v1UserRoutes.patch("/updateUserPlan",validateRol(ROLE.PROPIETARIO), updateUserPlanController); 
export default v1UserRoutes;


