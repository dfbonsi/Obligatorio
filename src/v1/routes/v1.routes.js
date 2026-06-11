import { Router } from "express";
import v1UserRoutes from "./v1.user.routes.js";
import v1AuthRoutes from "./v1.auth.routes.js";
import v1CategoryRoutes from "./v1.category.routes.js";
import v1PropertyRoutes from "./v1.property.routes.js";
import v1CloudinaryRoutes from "./v1.cloudinary.routes.js";

const v1Routes = Router();


v1Routes.use("/auth", v1AuthRoutes);
v1Routes.use("/users", v1UserRoutes);
v1Routes.use("/categorias", v1CategoryRoutes);
v1Routes.use("/propiedades", v1PropertyRoutes);
v1Routes.use("/cloudinary", v1CloudinaryRoutes);

export default v1Routes;