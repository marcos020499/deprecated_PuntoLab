const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    usuario: { type: String, required: [true, "El usuario es requerido"], unique: true },
    permisos: { type: Number, required: [true, "Los permisos son requeridos"] }
})

module.exports = mongoose.model("usuarios", usersSchema);