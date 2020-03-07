const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fichasSchema = new Schema({
    nombre: { type: Schema.Types.ObjectId, ref: "pv", required: [true, "El nombre es requerido"] },
    cantidad: { type: Number, required: [true, "La cantidad es requerida"] },
    prefijo: { type: String, required: [true, "El prefijo es requerida"] },
    costoFicha: { type: Number, required: [true, "El costoFicha es requerido"] },
    plan: { type: String, required: [true, "El plan es requerido"] },
    fichasVendidas: { type: Number, required: [true, "Las fichasVendidas es requerida"] },
    totalCobrado: { type: Number, required: [true, "El totalCobrado es requerida"] },
    comision: { type: Number, required: [true, "La comision es requerida"] },
    gananciaNeta: { type: Number, required: [true, "La gananciaNeta es requerida"] },
    errorFicha: { type: Boolean, default: false },
    errorFichaFolio: { type: String } 
});

module.exports = mongoose.model("fichas", fichasSchema);