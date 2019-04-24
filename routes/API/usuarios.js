// modules
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const adminPermisos = require("../permisosAdministrativos")

// models
const Usuarios = require("../../models/Usuarios")
const Servicios = require("../../models/Servicios")

// API Request validator
const APIAuth = require("../APIAuth");

// listar usuarios
app.get("/api/usuarios/listar", APIAuth.validate, (req, res) => {

    Usuarios.find({}).select("-password")
        .then(usuarios => res.status(201).json(usuarios))
        .catch(err => res.sendStatus(400))
})

// crear usuarios
app.post("/api/usuarios/nuevo", APIAuth.validate, (req, res) => {
    const { nombre, usuario, password, permisos } = req.body;

    const newUsuario = new Usuarios({
        nombre,
        usuario,
        password: bcrypt.hashSync(password, 7),
        permisos
    });

    newUsuario.save()
        .then(usuario => res.sendStatus(201))
        .catch(err => {
            if (err.code && err.code == 11000) {
                return res.sendStatus(409);
            }
            res.sendStatus(400)
        })
})

// detallar usuario
app.get("/api/usuarios/detallar/:_id", APIAuth.validate, (req, res) => {
    const { _id } = req.params

    Usuarios.findById(_id).select("-password")
        .then(usuario => {
            if (!usuario) {
                return res.sendStatus(404)
            }
            
            return res.status(200).json(usuario)
        })
        .catch(err => {
            if (err.name && err.name == "CastError") {
                return res.sendStatus(404)
            }
            return res.sendStatus(500)
        });
})

// editar usuarios
app.post("/api/usuarios/editar", APIAuth.validate, (req, res) => {

    const { _id, nombre, usuario, password, permisos } = req.body;

    Usuarios.findById(_id)
        .then(user => {
            if (!user) {
                return Promise.reject(404);
            }

            user.nombre = nombre,
            user.usuario = usuario,
            user.permisos = permisos
            password ? user.password = bcrypt.hashSync(password, 7) : null

            return user.save();
        })
        .then(saved => {
            return res.sendStatus(200);
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            } else if (err.code && err.code == 11000) {
                return res.sendStatus(409);
            }

            return res.sendStatus(500);
        });

})

// eliminar usuarios
app.post("/api/usuarios/eliminar", APIAuth.validate, (req, res) => {
    const { password, _id } = req.body;

    adminPermisos.validar(password)
        .then(admin => {
            if (!admin) {
                // si no hay permisos se termina en 404 (not found)
                return Promise.reject(404);
            }

            // busca cuantos servicios asociados hay al usuario
            return Servicios.countDocuments({ tecnico: _id });
        })
        .then(rows => {
            if (rows > 0) {
                // si hay 1 o mas entonces se termina en 302 (found)
                return Promise.reject(302)
            }

            // si no tiene ninguno se busca su info
            return Usuarios.findById(_id)
        })
        .then(user => {
            if (!user) {
                // si no hay info se termina en 204 (no content)
                return Promise.reject(204)
            }

            if (user.permisos === 0) {
                // si los permisos del usuario es 0 (admin)
                // se busca cuantos admins hay
                return Usuarios.countDocuments({ permisos: 0 })
            }

            // si no es admin entonces se retorna falso
            return false;
        })
        .then(isAdmin => {
            if (isAdmin === false) {
                // si no es admin puede eliminar
                return true;
            }

            if (isAdmin > 1) {
                // si hay mas de 1 admin puede eliminar
                return true;
            }

            // si no, no puede eliminar
            return false;
        })
        .then(canDelete => {
            if (!canDelete) {
                // si no puede eliminar termina en 304 (not modified)
                return Promise.reject(304);
            }

            // si puede eliminar lo hace
            return Usuarios.findByIdAndDelete(_id)
        })
        .then(deleted => res.sendStatus(200))
        .catch(err => {
            if (err == 404 || err == 302 || err == 204 || err == 304) {
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

// cambiar la contraseña
app.post("/api/password/new", APIAuth.validate, (req, res) => {
    const { _id, old_password, new_password } = req.body;

    Usuarios.findById(_id)
        .then(user => {
            if (!user) {
                return Promise.reject(404);
            }

            if (!bcrypt.compareSync(old_password, user.password)) {
                return Promise.reject(400);
            }

            user.password = bcrypt.hashSync(new_password, 7);
            return user.save();
        })
        .then(saved => {
            return res.sendStatus(200);
        })
        .catch(err => {
            if (err == 404 || err == 400) {
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

module.exports = app;