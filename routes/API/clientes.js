// modules
const express = require("express");
const app = express.Router();

// models
const Clientes = require("../../models/Clientes")

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

app.get("/api/clientes/listar", (req, res) => {
    Clientes.find()
        .then(clientes => res.status(200).json(clientes))
        .catch(err => res.sendStatus(500));
})

app.put("/api/clientes/editar", (req, res) => {

    const { nombre, telefono, direccion, comunidad, ciudad, id } = req.body;

    Clientes.findById(id)
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
            return res.status(200).json(cliente_editado);
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }
            console.log(err);
        })
})

module.exports = app;