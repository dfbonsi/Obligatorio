import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    //ir contra el request y obtener el header, authorization
    const error = new Error("Error al autenticar");
    error.status = 401;
    //console.log('req', req)
    const { headers } = req;
    const auth = headers.authorization;
    if (!auth) {
        next(error);
    }
    const elementos = auth.split(" ");
    //vemos si viene el bearer
    const vienenBearer = elementos[0] === "Bearer"
    if (!vienenBearer) {
        next(error);
    }
    // vemos si viene el token
    const token = elementos[1];
    if (!token) {
        next(error);
    };
    // validamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //de lo decodificado se lo agregamos al req.user
    req.user = decoded;
    next();
}