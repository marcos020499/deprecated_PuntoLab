const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instInternetSchema = new Schema({
    servicio: { type: Schema.Types.ObjectId, ref: "servicios", required: [true, "El detalle es requerido"] },
    paquete: { type: String, required: [true, "El paquete es requerido"] },
    costo: { type: String, required: [true, "El costo es requerido"] },
    netflix: { type: Boolean, default: false },
    tipoPago: { type: String, required: [true, "El tipo de pago es requerido"] }
});

module.exports = mongoose.model("instalacionInternet", instInternetSchema);