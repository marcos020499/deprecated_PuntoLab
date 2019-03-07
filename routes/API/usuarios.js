// modules
const express = require("express");
const app = express.Router();

// models
const Usuarios = require("../../models/Usuarios")

// listar usuarios
app.get("/api/usuarios/listar", (req, res) => {

    Usuarios.find({})
        .then(usuarios => res.status(201).json(usuarios))
        .catch(err => res.sendStatus(400))
})

// crear usuarios
app.post("/api/usuarios/nuevo", (req, res) => {
    const { nombre, usuario, permisos } = req.body;

    const newUsuario = new Usuarios({
        nombre,
        usuario,
        permisos
    });

    newUsuario.save()
        .then(usuario => res.status(201).json(usuario))
        .catch(err => {
            if (err.code && err.code == 11000) {
                return res.sendStatus(409);
            }
            res.sendStatus(400)
        })
})

// detallar usuario
app.get("/api/usuarios/detallar/:_id", (req, res) => {
    const { _id } = req.params

    Usuarios.findById(_id)
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
app.post("/api/usuarios/editar", (req, res) => {

    const { _id, nombre, usuario, permisos } = req.body;

    Usuarios.findById(_id)
        .then(user => {
            if (!user) {
                return Promise.reject(404);
            }

            user.nombre = nombre,
            user.usuario = usuario,
            user.permisos = permisos

            return user.save();
        })
        .then(saved => {
            return res.status(200).json(saved)
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
app.post("/api/usuarios/eliminar", (req, res) => {
    const { password, _id } = req.body;

    Usuarios.findOneAndDelete({ _id })
        .then(deleted => res.sendStatus(200))
        .catch(err => res.sendStatus(500))
})

module.exports = app;