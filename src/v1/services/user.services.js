import { userRepository } from "../repositories/user.repository.js";
import * as enums from "../constants/user.constants.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {

    let usuarios = await userRepository.getAll();
    return usuarios;
}
export const createUser = async (data) => {

    const { email } = data;
    const usuarioExiste = await userRepository.findByEmail(email);
    if (usuarioExiste) {
        throw new Error("Existe otro usuario con el mismo email");
    }
    return await userRepository.create(data);
}

export const updateUserPlan = async (data) => {

    const { userId, plan } = data;
    if (plan === enums.PLAN.PREMUIM){
        throw new Error("El usuario ya tiene el plan mas alto");
    }
    data.plan= enums.PLAN.PREMUIM;
    const user = await userRepository.patchById(userId,data);
    const token = jwt.sign(
            //elegimos los datos a compartir 
            {
                userId: user._id,
                email: user.email,
                roles: user.roles,
                plan: user.plan
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    return token;
};