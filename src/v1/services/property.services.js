import { propertyRepository } from "../repositories/property.repository.js";
import { categoryRepository } from "../repositories/category.repository.js";
import { PLAN } from "../constants/user.constants.js";
import { destroyAsset, extractPublicIdFromUrl } from "./cloudinary.services.js";

export const getAllProperties = async (page, limit) => {

    let propiedades = await propertyRepository.getAllPaginated(page, limit);
    return propiedades;
}

export const getAllUserProperties = async (userid) => {
    let propiedades = await propertyRepository.getAllbyUser(userid);
    return propiedades;
}

export const getAllPropertiesWithFilters = async (page, limit,filter, sortOption) => {

    let propiedades = await propertyRepository.findByFilterPaginated(page, limit,filter, sortOption);
    return propiedades;
}

export const createProperty = async (data) => {
    const userProperties = await propertyRepository.getAllbyUser(data.userId);
    if (data.plan!=PLAN.PREMUIM && userProperties.length > 3){
        const error = new Error("Has alcanzado el maximo de propiedades. Por favor actualiza el plan");
        error.status = 400;
        throw error;
    }
    const categoriaExiste = await categoryRepository.findById(data.categoryId);
    if (!categoriaExiste) {
        const error = new Error("La categoria no existe");
        error.status = 400;
        throw error;
    }
    const property = await propertyRepository.create(data);
    return property;
}

export const updateProperty = async (id, data) => {
    const esOwner = await propertyRepository.findByFilter({ userId: data.userId, _id:id });
    if (!esOwner) {
        const error = new Error("No puede modificar esa propiedad");
        error.status = 401;
        throw error;
    }
    const property = await propertyRepository.patchById(id, data);
    return property;
};

export const deleteProperty = async (id,userid) => {
    const esOwner = await propertyRepository.findByFilter({ userId: userid, _id:id });
    if (!esOwner) {
        const error = new Error("No puede borrar esa propiedad");
        error.status = 401;
        throw error;
    }
    const publicId = esOwner.imagePublicId?.trim() || extractPublicIdFromUrl(esOwner.imageUrl);
    if (publicId) {
        const cloudinaryResult = await destroyAsset(publicId);
        if (!["ok", "not found"].includes(cloudinaryResult.result)) {
            const error = new Error("No se pudo eliminar la imagen en Cloudinary");
            error.status = 502;
            throw error;
        }
    }
    const property = await propertyRepository.deleteById(id);
    return property;
};