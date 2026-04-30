import Joi from "joi";
import mongoIdSchema from "./common.schemas.js";


export const createPropertySchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price_by_night: Joi.number().min(1).required(),
  location: Joi.object({
    city: Joi.string().required(),
    zone: Joi.string().required(),
    address: Joi.string().required()
  }).required(),
  rooms: Joi.number().integer().min(1).required(),
  bathrooms: Joi.number().integer().min(1).required(),
  categoryId: Joi.string().hex().length(24).required(),
  imageUrl: Joi.string().uri(),
});

export const replacePropertySchema = Joi.object({
  title: Joi.string().min(5).max(100),
  description: Joi.string().min(10).max(1000),
  price_by_night: Joi.number().min(1),
  location: Joi.object({
    city: Joi.string(),
    zone: Joi.string(),
    address: Joi.string()
  }),
  rooms: Joi.number().integer().min(1),
  bathrooms: Joi.number().integer().min(1),
  categoryId: Joi.string().hex().length(24),
  imageUrl: Joi.string().uri().allow(null, "")
})
.min(1);

export const propertyIdParamSchema = Joi.object({
    id: mongoIdSchema
});

//export const filtersParamSchema = 