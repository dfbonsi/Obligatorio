import { categorySchema, propertyIdParamSchema} from "../schemas/category.schemas.js";
import { validate } from "./validate.middleware.js";

export const validateCategory = validate(categorySchema, "body");

export const validateParamsProperty = validate(propertyIdParamSchema, "params");