import { Router } from "express";
import { destroyCloudinaryAsset, getUploadSignature } from "../controllers/cloudinary.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const v1CloudinaryRoutes = Router();

v1CloudinaryRoutes.use(authMiddleware);
v1CloudinaryRoutes.get("/signature", getUploadSignature);
v1CloudinaryRoutes.delete("/destroy", destroyCloudinaryAsset);

export default v1CloudinaryRoutes;
