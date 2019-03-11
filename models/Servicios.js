const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviciosSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"], unique: true }
});

module.exports = mongoose.model("servicios", serviciosSchema)