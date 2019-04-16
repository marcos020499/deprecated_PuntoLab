// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../../models/Servicios")
const InstCamaras = require("../../../models/instalacionCamaras");

// Nuevo servicio 1 - Instalación de camaras de seguridad
app.post("/api/servicios/1/nuevo", (req, res) => {

    const { cliente, tecnico, tipo, data, fechaTentativa, fechaSolicitud } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa, fechaSolicitud })

    servicio.save()
        .then(service => {

            const { camaras, costo, tipoPago } = data;

            const instCamaras = new InstCamaras({
                servicio: service._id,
                camaras,
                costo,
                tipoPago
            })

            return instCamaras.save()
        })
        .then(saved => res.sendStatus(201))
        .catch(err => res.sendStatus(400))
})

// Editar servicio 1
app.post("/api/servicios/1/editar", (req, res) => {

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
            return InstCamaras.findOne({ servicio: _id })
        })
        .then(detalle => {
            const { camaras, costo, tipoPago } = data;
            detalle.camaras = camaras;
            detalle.costo = costo;
            detalle.tipoPago = tipoPago;
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

app.post("/api/servicios/1/visita", (req, res) => {

    const { id, material, mastil, sector } = req.body;

    Servicios.findById(id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            service.sc = true;
            return service.save();
        })
        .then(saved => InstCamaras.findOne({ servicio: id }))
        .then(service => {
            service.material = material;
            service.mastil = mastil;
            service.sector = sector

            return service.save();
        })
        .then(saved => res.sendStatus(200))
        .catch(err => {
            if (err === 404 || err.name && err.name === "CastError") {
                res.sendStatus(404);
            }

            res.sendStatus(500);
        })
})

module.exports = app;