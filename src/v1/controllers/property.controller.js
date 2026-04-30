import * as propertyService from "../services/property.services.js";
import { generarDescripcionIA } from "../services/ai.service.js";

export const getAllPropertiesController = async (req, res, next) => {
    try {
        const { 
            page, 
            limit,  
            categoryId,
            max_price,
            min_price,
            city,
            zone,
            rooms,
            sort = "createdAt",
            order = "desc"
        } = req.query;
        const paginas = page || 1;
        const limite = limit || 10;
        const filtro = {};
        if (categoryId) filtro.categoryId = categoryId;
        if (city) filtro["location.city"] = city;
        if (zone) filtro["location.zone"] = zone;
        if (rooms) {
            filtro.rooms = { $gte: Number(rooms) };
        }
        if (min_price || max_price) {
            filtro.price_by_night = {};
            if (min_price) filtro.price_by_night.$gte = Number(min_price);
            if (max_price) filtro.price_by_night.$lte = Number(max_price);
        }  
        const sortOption = {
            [sort]: order === "asc" ? 1 : -1
        };
        const propiedades = await propertyService.getAllPropertiesWithFilters(paginas,limite,filtro,sortOption);
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
            const error = new Error("Propiedad no encontrada");
            error.status = 404;
            throw error;
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
            const error = new Error("Propiedad no encontrada");
            error.status = 404;
            throw error;
        }
        res.json({
            message: 'Propiedad borrada exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

export const generarDescripcion = async (req, res) => {
  try {
    const data = req.body;

    const descripcion = await generarDescripcionIA(data);
    if (!descripcion) {
        return res.status(400).json({
        success: false,
        mensaje: "No se pudo generar la descripción automáticamente. Puedes ingresarla manualmente."
      });
    }

    res.json({
      success: true,
      descripcion
    });

  } catch (error) {
     const mensaje = error.message;
    res.status(500).json({
      error: "Error interno",
      mensaje
    });
  }
};