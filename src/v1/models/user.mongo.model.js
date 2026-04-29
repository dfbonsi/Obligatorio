import mongoose from "mongoose";
import * as enums from "../constants/user.constants.js";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, require: true, select: false  },
    roles: {
        type: [String],
        enum: enums.ROLES,
        default: [enums.ROLE.USER]
    },
    plan:{ type: String, required: true, trim: true, default: enums.PLAN.PLUS }
    
}, { timestamps: true })

//se agrega el tojson para transformar la salida al hacer res.status.json
userSchema.set('toJSON', {
    //doc es el documento de mongoose y ret el elemento a devolver
    transform: (doc, ret) => {
        // renombrar _id → id
        ret.id = ret._id;

        // eliminar campos que no querés exponer
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.password;
        return ret;
    }
});




export const User = mongoose.model("usuarios", userSchema);