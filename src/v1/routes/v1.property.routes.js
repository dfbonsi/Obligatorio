import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import * as pController from "../controllers/property.controller.js";
import { getTokenImage } from "../controllers/image.controller.js"
import validateRol from "../middleware/roles.middleware.js";
import { ROLE } from "../constants/user.constants.js";
import { validateParamsProperty, validateCreateProperty, validatePatchProperty } from "../middleware/property.validate.middleware.js";
const v1PropertyRoutes = Router();

//v1PropertyRoutes.post("/img-token", getTokenImage);
v1PropertyRoutes.use(authMiddleware);
v1PropertyRoutes.get("/",  pController.getAllPropertiesController);
v1PropertyRoutes.get("/mispropiedades",  validateRol(ROLE.PROPIETARIO), pController.getAllPropertiesByUserController);
v1PropertyRoutes.post("/", validateRol(ROLE.PROPIETARIO),validateCreateProperty, pController.createPropertyController);
v1PropertyRoutes.patch("/:id", validateRol(ROLE.PROPIETARIO), validateParamsProperty, validatePatchProperty, pController.updatePropertyController);
v1PropertyRoutes.delete("/:id", validateRol(ROLE.PROPIETARIO), validateParamsProperty, pController.deletePropertyController);
v1PropertyRoutes.post("/generar-descripcion", validateRol(ROLE.PROPIETARIO),validatePatchProperty, pController.generarDescripcion);

export default v1PropertyRoutes;


