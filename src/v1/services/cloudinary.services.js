import cloudinary from "../config/cloudinary.config.js";

export const generateUploadSignature = () => {
    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign = {
        timestamp,
        folder: "mi-app",
    };

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
    );

    return {
        timestamp,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder: "mi-app",
    };
};

export const destroyAsset = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
    });
};

export const extractPublicIdFromUrl = (imageUrl) => {
    if (!imageUrl) return null;

    try {
        const url = new URL(imageUrl);
        const uploadMarker = "/upload/";
        const uploadIndex = url.pathname.indexOf(uploadMarker);

        if (uploadIndex === -1) return null;

        let assetPath = url.pathname.slice(uploadIndex + uploadMarker.length);
        assetPath = assetPath.replace(/^v\d+\//, "");

        const extensionIndex = assetPath.lastIndexOf(".");
        if (extensionIndex === -1) return assetPath;

        return assetPath.slice(0, extensionIndex);
    } catch {
        return null;
    }
};
