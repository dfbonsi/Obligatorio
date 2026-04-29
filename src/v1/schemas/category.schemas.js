import Joi from "joi";
import mongoIdSchema from "./common.schemas.js";

export const categorySchema = Joi.object({
    categoryName: Joi.string().min(3).max(20).required()
});

export const propertyIdParamSchema = Joi.object({
    id: mongoIdSchema
});