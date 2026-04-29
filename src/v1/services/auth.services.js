import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

export const registerUser = async (user) => {
    const { email } = user;
    //buscamos el usuario por email y si ya existe podriamos lanzar un error
    const usuarioExiste = await userRepository.findByEmail(email);
    if (usuarioExiste) {
        throw new Error("Existe otro usuario con el mismo email");
    };
    const { password } = user;
    //encriptamos el password con bcrypt
    //sobreescribir el password con el encriptado y eso se lo pasamos al create
    const hashedPassword = await bcrypt.hash(password, 10); //numero ideal es 12
    const userHash = { ...user, password: hashedPassword };
    const usuarioCreado = await userRepository.create(userHash);
    //console.log(usuarioCreado);
    const token = jwt.sign(
        //elegimos los datos a compartir 
        {
            userId: usuarioCreado._id,
            email: usuarioCreado.email,
            roles: usuarioCreado.roles,
            plan: usuarioCreado.plan
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
}

export const loginUser = async (user) => {
    //recuperamos email y username porque en este ejemplo el usuario se puede loguear con email o username
    const { email, password } = user;

    //recuperar el usuario de la base con el email o username
    const usuarioDeBase = await userRepository.findByEmailLogin(email);

    //los mensajes de error de login deben ser lo menos descriptivos para no avivar a los atacantes
    if (!usuarioDeBase) {
        const error = new Error("Hubo un error al loguearte");
        error.status = 400;
        throw error;
    }
    //con el usuario de la base obtenemos su password 
    const { password: hashedPassword } = usuarioDeBase;
    //comparamos con bcrypt el password del usuario pasado por parametro
    //primero el password plano y segundo el hasheado
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    //si todo sale bien generamos el token
    if (!isPasswordValid) {
        const error = new Error("Hubo un error al loguearte");
        error.status = 400;
        throw error;
    }
    // a partir de el usuario de la base agrega al token los datos que queremos compartir con el frontend
    //pasarlo a util para usarlo en registro tambien
    const token = jwt.sign(
        //elegimos los datos a compartir 
        {
            userId: usuarioDeBase._id,
            email: usuarioDeBase.email,
            roles: usuarioDeBase.roles, 
            plan: usuarioDeBase.plan
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return token;
}