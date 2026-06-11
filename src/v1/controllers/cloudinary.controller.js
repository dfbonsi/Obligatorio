import { destroyAsset, generateUploadSignature } from "../services/cloudinary.services.js";

export const getUploadSignature = (req, res) => {
    try {
        const data = generateUploadSignature();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Error generando firma de Cloudinary",
            error: error.message,
        });
    }
};

export const destroyCloudinaryAsset = async (req, res) => {
    try {
        const { publicId } = req.body;

        if (!publicId) {
            return res.status(400).json({
                message: "publicId es requerido",
            });
        }

        const result = await destroyAsset(publicId);

        if (result.result !== "ok") {
            return res.status(404).json({
                message: "Recurso no encontrado en Cloudinary",
                result: result.result,
            });
        }

        res.json({
            message: "Recurso eliminado correctamente",
            result: result.result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error eliminando recurso de Cloudinary",
            error: error.message,
        });
    }
};
