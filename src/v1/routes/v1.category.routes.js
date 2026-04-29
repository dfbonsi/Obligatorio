import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllCategoriesController, createCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/category.controller.js"
import validateRol from "../middleware/roles.middleware.js";
import { validateCategory, validateParamsProperty } from "../middleware/category.validate.middleware.js";
import { ROLE } from "../constants/user.constants.js";
const v1CategoryRoutes = Router();


v1CategoryRoutes.use(authMiddleware);
v1CategoryRoutes.get("/", getAllCategoriesController);
v1CategoryRoutes.post("/",validateRol(ROLE.PROPIETARIO), validateCategory, createCategoryController);

v1CategoryRoutes.patch("/:id", validateRol(ROLE.PROPIETARIO), validateParamsProperty, validateCategory, updateCategoryController);
v1CategoryRoutes.delete("/:id", validateRol(ROLE.PROPIETARIO), validateParamsProperty, validateCategory, deleteCategoryController);

export default v1CategoryRoutes;
