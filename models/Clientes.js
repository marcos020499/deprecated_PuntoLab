const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    telefono: { type: String },
    direccion: { type: String, required: [true, "La direccion es requerida"] },
    comunidad: { type: String },
    ciudad: { type: String, required: [true, "La ciudad es requerida"] }
});

module.exports = mongoose.model("clientes", clientesSchema)