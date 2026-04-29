import { propertyIdParamSchema, createPropertySchema, replacePropertySchema } from "../schemas/property.schemas.js";
import { validate } from "./validate.middleware.js";



export const validateCreateProperty = validate(createPropertySchema, "body");
export const validatePatchProperty = validate(replacePropertySchema, "body");

export const validateParamsProperty = validate(propertyIdParamSchema, "params");
