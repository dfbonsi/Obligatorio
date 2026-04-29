export const errorMiddleware = (err, req, res, next) => {
    if (err) {

        if (err.isJoi) {
            const message = err.details
                .map(e => e.message.replace(/"/g, ''))
                .join(', ');
            return res.status(400).json({
                message
            });

        } else {
            const status = err.status ?? 500;
            const message = err.message ?? "Error sin mensaje";
            return res.status(status).json({ message });
        }
    }
    return res.status(500).json("Error desconocido");

}
