const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "clientes", required: [true, "El cliente es requerido"] },
    tecnico: { type: Schema.Types.ObjectId, ref: "usuarios", required: [true, "El técnico es requerido"] },
    tipo: { type: String, required: [true, "El tipo de servicio es requerido"] },
    fechaTentativa: { type: String, required: [true, "La fecha tentativa es requerida"]},
    fechaSolicitud: { type: String, required: [true, "La fecha de atención es requerida"]},
    fechaReagendado: { type: String },
    sc: { type: Boolean, default: false },
    fechaConclusion: { type: Date },
    image: { type: String },
    pagoTecnico: { type: Number, required: [true, "El pago es requerido"] }
});

// sc: Servicio concluido (Cuando el tecnico realiza el trabajo este valor cambia a verdadero)

module.exports = mongoose.model("servicios", serviciosSchema);