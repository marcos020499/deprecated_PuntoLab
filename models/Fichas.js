const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fichasSchema = new Schema({
    pv: { type: Schema.Types.ObjectId, ref: "pv", required: [true, "El PV es requerido"] },
    cantidad: { type: Number, required: [true, "La cantidad es requerida"] },
    prefijo: { type: String, required: [true, "El prefijo es requerida"] },
    costo: { type: Number, required: [true, "El costoFicha es requerido"] },
    plan: { type: String, required: [true, "El plan es requerido"] },
    vendidas: { type: Number, required: [true, "Las fichasVendidas es requerida"] },
    total_cobrado: { type: Number, required: [true, "El totalCobrado es requerida"] },
    comision: { type: Number, required: [true, "La comision es requerida"] },
    ganancia_neta: { type: Number, required: [true, "La gananciaNeta es requerida"] },
    error: { type: Boolean, default: false },
    folio_error: { type: String } 
});

module.exports = mongoose.model("fichas", fichasSchema);