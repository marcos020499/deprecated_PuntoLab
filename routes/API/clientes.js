// modules
const express = require("express");
const app = express.Router();

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

// listar clientes
app.get("/api/clientes/detallar/:id", (req, res) => {
    const { id } = req.params

    Clientes.findOne({ _id: id })
        .then(cliente => res.status(200).json(cliente))
        .catch(err => {
            if (err.name == "CastError") {
                res.sendStatus(404)
            }
            res.sendStatus(500)
        });
})

// editar cliente
app.post("/api/clientes/editar", (req, res) => {

    const { _id, nombre, telefono, direccion, comunidad, ciudad } = req.body;

    Clientes.findById(_id)
        .then(cliente => {
            if (cliente) {
                cliente.nombre = nombre;
                cliente.telefono = telefono;
                cliente.direccion = direccion;
                cliente.comunidad = comunidad;
                cliente.ciudad = ciudad;

                return cliente.save();
            }

            return Promise.reject(404);
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
    const { password, id } = req.body;

    Clientes.findOneAndDelete({ _id: id })
        .then(deleted => res.sendStatus(200))
        .catch(err => res.sendStatus(500))
})

module.exports = app;