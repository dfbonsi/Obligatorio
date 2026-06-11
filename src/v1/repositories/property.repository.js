import { Property } from "../models/property.mongo.model.js";


export const propertyRepository = {
    getAll: async () => {
        const propiedades = await Property.find().populate("userId", "email -_id").populate("categoryId", "categoryName");
        return propiedades;
    },
    getAllbyUser: async (userid) => {
        const propiedades = await Property.find({ userId: userid }).populate("userId", "email -_id").populate("categoryId", "categoryName");
        return propiedades;
    },
    getAllPaginated: async (page, limit) => {
        const skip = (page - 1) * limit;
        const propiedades = await Property.find().skip(skip).limit(limit).populate("userId", "email -_id").populate("categoryId", "categoryName");
        return propiedades;
    },
    create: async (data) => {
        const propiedades = await Property.create(data);
        return propiedades;
    },
    findByFilter: async (filter) => {
        const propiedades = await Property.findOne(filter);
        return propiedades;
    },
    findByFilterPaginated: async (page, limit, filter, sortOption) => {
        const skip = (page - 1) * limit;
        const propiedades = await Property.find(filter).skip(skip).limit(limit).sort(sortOption).populate("userId", "email -_id").populate("categoryId", "categoryName");
        return propiedades;
    },
    patchById: async (id, data) => {
        return await Property.findByIdAndUpdate(
            id, //aca es el id del usuario a actualizar
            data,
            {
                new: true,
                runValidators: true
            }
        );
    },
    deleteById: async (propertyid) => {
        const propiedades = await Property.findOneAndDelete({ _id: propertyid });
        return propiedades;
    },
    removeCategory: async (categoryid) => {
        const propiedades = await Property.updateMany({categoryId:categoryid}, { $unset: { categoryId: ""} });
        return propiedades;
    }
}