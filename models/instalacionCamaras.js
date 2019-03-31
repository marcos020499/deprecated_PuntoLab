const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instCamarasSchema = new Schema({
    servicio: { type: Schema.Types.ObjectId, ref: "servicios", required: [true, "El detalle es requerido"] },
    camaras: { type: Number, required: [true, "El paquete es requerido"] },
    costo: { type: String, required: [true, "El costo es requerido"] },
    tipoPago: { type: String, required: [true, "El tipo de pago es requerido"] }
});

module.exports = mongoose.model("instalacionCamaras", instCamarasSchema);