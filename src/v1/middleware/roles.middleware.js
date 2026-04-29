const validateRol = (...roles) => {
    return (req, res, next) => {
        //console.log('roles', roles)
        const { user } = req;
        const rolesUsuario = user.roles;

        if (rolesUsuario) {
            const tieneRoles = roles.every(rol => rolesUsuario.includes(rol));
            if (tieneRoles) {
                return next();
            }
        }
        const error = new Error("No tiene roles suficientes");
        error.status = 400;
        return next(error);
    }
}

export default validateRol;