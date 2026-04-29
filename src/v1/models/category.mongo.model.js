import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, unique: true, required: true, trim: true },
}, { timestamps: true })

//se agrega el tojson para transformar la salida al hacer res.status.json
categorySchema.set('toJSON', {
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

export const Category = mongoose.model("categorias", categorySchema);