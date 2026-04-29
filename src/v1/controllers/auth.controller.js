import { loginUser, registerUser } from "../services/auth.services.js";


export const registerController = async (req, res, next) => {
    try {
        const { body } = req;
        const token = await registerUser(body);
        res.status(201).json({ token })
    } catch (error) {
        next(error)
    }
}
export const loginController = async (req, res, next) => {
    try {
        const { body } = req;
        const token = await loginUser(body);
        res.status(200).json({ token })
    } catch (error) {
        next(error)
    }
}