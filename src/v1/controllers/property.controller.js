import * as propertyService from "../services/property.services.js";

export const getAllPropertiesController = async (req, res, next) => {
    try {
        const propiedades = await propertyService.getAllProperties();
        //console.log('propiedades', propiedades)
        res.status(200).json({ propiedades })
    } catch (error) {

        next(error)
    }
}
export const getAllPropertiesByUserController = async (req, res, next) => {
    try {
        const { user } = req;
        const userId = user.userId;
        const propiedades = await propertyService.getAllUserProperties(userId);
        res.status(200).json({ propiedades })
    } catch (error) {

        next(error)
    }
}

export const createPropertyController = async (req, res, next) => {
    try {
        //al tener que estar logueado tenemos el token y tenemos el usuario entonces podesmos acceder a la info del usuario desde el req.user
        const { body, user } = req;
        const userId = user.userId; //esto es lo que me da el token, el id del usuario logueado
        const plan = user.plan
        const data = { ...body, userId , plan} 
        const propiedad = await propertyService.createProperty(data);
        res.status(201).json({ propiedad })
    } catch (error) {
        next(error)
    }
}

export const updatePropertyController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { userId } = req.user;

        const  data= req.body;
        data.userId = userId; 
        const property = await propertyService.updateProperty(id, data);
        if (!property) {
            return next(createError('Propiedad no encontrada', 404));
        }
        res.json({
            message: 'Propiedad actualizada',
            property
        });
    } catch (error) {
        next(error);
    }
};

export const deletePropertyController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { userId } = req.user;

        const property = await propertyService.deleteProperty(id,userId);
        if (!property) {
            return next(createError('Propiedad no encontrada', 404));
        }
        res.json({
            message: 'Propiedad borrada exitosamente'
        });
    } catch (error) {
        next(error);
    }
};