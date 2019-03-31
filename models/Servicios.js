const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "clientes", required: [true, "El cliente es requerido"] },
    tecnico: { type: Schema.Types.ObjectId, ref: "usuarios", required: [true, "El técnico es requerido"] },
    tipo: { type: String, required: [true, "El tipo de servicio es requerido"] },
    fechaTentativa: { type: Date, required: [true, "La fecha es requerida"]}
});

module.exports = mongoose.model("servicios", serviciosSchema);