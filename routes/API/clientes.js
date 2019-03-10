// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos")

// models
const Clientes = require("../../models/Clientes")

// crear cliente
app.post("/api/clientes/nuevo", (req, res) => {
    const { nombre, telefono, direccion, comunidad, ciudad } = req.body;

    const newCliente = new Clientes({
        nombre,
        telefono,
        direccion,
        comunidad,
        ciudad
    });

    newCliente.save()
        .then(cliente => res.status(201).json(cliente))
        .catch(err => res.sendStatus(400))
})

// listar clientes
app.post("/api/clientes/listar", (req, res) => {
    const { itemsToShow, salto, filtro } = req.body
    let clientes = [];
    let criterio = {}

    if (filtro) {
        criterio = { nombre: { $regex: '(?i).*' + filtro + '(?i).*' } };
    }

    Clientes.find(criterio).skip(Number(salto)).limit(Number(itemsToShow))
        .then(_clientes => {
            clientes = _clientes;
            return Clientes.find(criterio)
        })
        .then(data => res.status(200).json({ clientes, totalItems: data.length }))
        .catch(err => es.sendStatus(500));
})

// detallar cliente
app.get("/api/clientes/detallar/:_id", (req, res) => {
    const { _id } = req.params

    Clientes.findById(_id)
        .then(cliente => {
            if (!cliente) {
                return res.sendStatus(404);
            }

            return res.status(200).json(cliente)
        })
        .catch(err => {
            if (err.name && err.name == "CastError") {
                return res.sendStatus(404)
            }
            return res.sendStatus(500)
        });
})

// editar cliente
app.post("/api/clientes/editar", (req, res) => {

    const { _id, nombre, telefono, direccion, comunidad, ciudad } = req.body;

    Clientes.findById(_id)
        .then(cliente => {
            if (!cliente) {
                return Promise.reject(404);
            }

            cliente.nombre = nombre;
            cliente.telefono = telefono;
            cliente.direccion = direccion;
            cliente.comunidad = comunidad;
            cliente.ciudad = ciudad;

            return cliente.save()
        })
        .then(cliente_editado => {
            return res.sendStatus(200);
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }
            res.sendStatus(500);
        })
})

// eliminar clientes
app.post("/api/clientes/eliminar", (req, res) => {
    const { password, _id } = req.body;
    let admin = {};

    permisoAdmin.validar(password)
        .then(_admin => {
            if (!_admin) {
                return Promise.reject(401);
            }
            
            admin = _admin.usuario;
            return Clientes.findOneAndDelete({ _id });
        })
        .then(deleted => res.status(200).json({ admin }))
        .catch(err => {
            if (err == 401) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})


module.exports = app;