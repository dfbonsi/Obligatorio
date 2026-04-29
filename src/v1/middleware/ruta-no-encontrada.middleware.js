export const rutaNoEncontradaMiddleware = (req, res, next) => {
    res.status(404).json({ message: `Ruta no encontrada ${req.host}${req.path}` });
}       