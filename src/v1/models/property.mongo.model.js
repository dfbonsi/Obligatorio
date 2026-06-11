import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price_by_night: { type: Number, required: true },
    location: { 
        city: { type: String, required: true },
        zone: { type: String, required: true },
        address: { type: String, required: true}
    },
    rooms: { type: Number, required: true },
    bathrooms: {  type: Number, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorias",
        required: false
    },
    imageUrl: { type: String, required: false },
    imagePublicId: { type: String, required: false }
}, { timestamps: true })

//se agrega el tojson para transformar la salida al hacer res.status.json
propertySchema.set('toJSON', {
    //doc es el documento de mongoose y ret el elemento a devolver
    transform: (doc, ret) => {
        // renombrar _id → id
        ret.id = ret._id;
        // eliminar campos que no querés exponer
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});




export const Property = mongoose.model("propiedades", propertySchema);