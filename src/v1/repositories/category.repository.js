import { Category } from "../models/category.mongo.model.js";

export const categoryRepository = {
    getAll: async () => {
        const categorias = await Category.find();
        return categorias;
    },
    findByName: async (data) => {
        const categoria = await Category.findOne({ categoryName: data });
        return categoria;
    },
    findById: async (data) => {
        const categoria = await Category.findOne({ _id : data });
        return categoria;
    },
    create: async (data) => {
        const categoria = await Category.create({ categoryName: data });
        return categoria;
    },
    patchById: async (id, data) => {
        return await Category.findByIdAndUpdate(
            id, //aca es el id del usuario a actualizar
            data,
            {
                new: true,
                runValidators: true
            }
        );
    },
    deleteById: async (id) => {
        const categorias = await Category.findOneAndDelete({ _id: id });
        return categorias;
    }
}