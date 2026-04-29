import Joi from 'joi';

const mongoIdSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        'string.empty': 'El id es obligatorio',
        'string.pattern.base': 'El id no tiene formato válido',
        'any.required': 'El id es obligatorio'
    });

export default mongoIdSchema;