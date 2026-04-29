import Joi from "joi";
import { ROLE, ROLES } from "../constants/user.constants.js";



export const userCreateBodySchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
    roles: Joi.array()
        //se hace spread de ...ROLES porque Joi.string().valid('admin', 'editor', 'viewer')
        .items(Joi.string().valid(...ROLES).messages({
            'any.only': '{#label} con valor "{#value}" no es válido. Permitidos: PROPIETARIO o USER'
        }))
        .min(1)
        .unique()
        .default([ROLE.USER])
});

export const userLoginBodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required()
});

