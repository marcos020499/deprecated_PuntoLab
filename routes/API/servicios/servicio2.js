// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../../models/Servicios")
const Soporte = require("../../../models/Soporte");

// Nuevo servicio 2 - Soporte general
app.post("/api/servicios/2/nuevo", (req, res) => {
    const { cliente, tecnico, tipo, data, fechaTentativa, fechaSolicitud } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa, fechaSolicitud })

    servicio.save()
        .then(service => {

            const { problema } = data;

            const soporte = new Soporte({
                servicio: service._id,
                problema
            })

            return soporte.save()
        })
        .then(saved => res.sendStatus(201))
        .catch(err => res.sendStatus(400))
})

// Editar servicio 2
app.post("/api/servicios/2/editar", (req, res) => {

    const { _id, tecnico, data } = req.body;

    Servicios.findById(_id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            service.tecnico = tecnico;
            return service.save();
        })
        .then(done => {
            return Soporte.findOne({ servicio: _id })
        })
        .then(detalle => {
            const { problema } = data;
            detalle.problema = problema;
            return detalle.save();
        })
        .then(edited => res.sendStatus(201))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})

module.exports = app;