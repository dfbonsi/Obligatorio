import { User } from "../models/user.mongo.model.js";

export const userRepository = {
    getAll: async () => {
        const usuarios = await User.find();
        return usuarios;
    }, 
    getAllPaginated: async (page, limit) => {
        const skip = (page - 1) * limit;
        const usuarios = await User.find().skip(skip).limit(limit);
        return usuarios;
    },
    findByEmail: async (data) => {
        const usuario = await User.findOne({ email: data });
        return usuario;
    },
    findByEmailLogin: async (data) => {
        const usuario = await User.findOne({ email: data }).select("+password");
        return usuario;
    },
    create: async (data) => {
        const usuario = await User.create(data);
        return usuario;
    },
    findByFilter: async (filter) => {
        const usuario = await User.findOne(filter);
        return usuario;
    },
    patchById: async (id, data) => {
        return await User.findByIdAndUpdate(
            id, //aca es el id del usuario a actualizar
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }
}