const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pvSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    localidad: { type: String, required: [true, "La localidad es requerida"] },
    antena: { type: String, required: [true, "La antena es requerida"] },
    enlace: { type: String, required: [true, "El enlace es requerido"] },
    router: { type: String, required: [true, "El router es requerido"] },
    ip: { type: String, required: [true, "La ip es requerida"] }
})

module.exports = mongoose.model("pv", pvSchema);