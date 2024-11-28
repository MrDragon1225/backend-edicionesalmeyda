import { Schema, model } from 'mongoose';

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }, // Agrega el campo descripcion
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String }
});

export default model('Producto', productoSchema);
