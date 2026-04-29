import * as userService from "../services/user.services.js";

export const getAllUserController = async (req, res, next) => {
    try {
        const usuarios = await userService.getAllUsers();
        //console.log('usuarios', usuarios)
        res.status(200).json({ usuarios })
    } catch (error) {

        next(error)
    }
}

export const updateUserPlanController = async (req, res, next) => {
   try {
        const user  = req.user;
        const token = await userService.updateUserPlan(user);
        if (!token) {
            return next(createError('Plan no actualizado', 404));
        }
        res.json({
            message: 'Plan actualizado',
            token
        });
    } catch (error) {
        next(error);
    }
}

