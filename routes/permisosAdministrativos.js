// modules
const bcrypt = require("bcrypt");

// models
const Usuarios = require("../models/Usuarios")

async function validar(admin_password) {
  try {
    const admins = await Usuarios.find({ permisos: 0 })
    const result = await admins.filter(i => {
        if (bcrypt.compareSync(admin_password, i.password)) {
            return i;
        }
        return null;
    })
    if (result.length > 0) {
        return result[0]
    }
    return null;
  } catch (error) {
    return error;
  }
}

module.exports = {
    validar
}