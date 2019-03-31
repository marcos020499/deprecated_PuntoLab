const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soporteInternetSchema = new Schema({
    servicio: { type: Schema.Types.ObjectId, ref: "servicios", required: [true, "El detalle es requerido"] },
    problema: { type: String, required: [true, "El problema es requerido"] }
});

module.exports = mongoose.model("soporteInternet", soporteInternetSchema);