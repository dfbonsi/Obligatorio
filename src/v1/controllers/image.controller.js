import { handleUpload } from "@vercel/blob/client";



export const getTokenImage = async (req, res) => {
    try {
        console.log('Entro en token')
        const pathname = req.body.pathname;

        const jsonResponse = await handleUpload({
            pathname,
            request: req,

            async onBeforeGenerateToken(pathname) {
                // Acá deberías autenticar al usuario de verdad
                // Ejemplo:
                // const user = req.user;
                // if (!user) throw new Error("No autorizado");

                // Validación simple del nombre/path
                if (!pathname) {
                    throw new Error("Pathname inválido");
                }
                return {
                    allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({
                        folder: "avatars",
                        uploadedAt: new Date().toISOString(),
                    }),
                };
            },
            async onUploadCompleted({ blob, tokenPayload }) {
                console.log("Upload completado");
                console.log("URL:", blob.url);
                console.log("Pathname:", blob.pathname);
                console.log("Size:", blob.size);
                console.log("Token payload:", tokenPayload);

                // Acá podrías guardar en DB:
                // - blob.url
                // - blob.pathname
                // - userId
                // - fecha
            },
        });
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.error("Error al obtener token de la imagen:", error);
        return res.status(400).json({
            ok: false,
            error: error.message || "Error generando upload token",
        });
    }
};
