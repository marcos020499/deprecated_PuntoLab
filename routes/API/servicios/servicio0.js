// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../../models/Servicios")
const InstInternet = require("../../../models/instalacionInternet");

// Nuevo servicio 0 - Instalación de internet
app.post("/api/servicios/0/nuevo", (req, res) => {

    const { cliente, tecnico, tipo, data, fechaTentativa, fechaSolicitud } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa, fechaSolicitud })

    servicio.save()
        .then(service => {

            const { paquete, netflix, costo, tipoPago } = data;

            const instInternet = new InstInternet({
                servicio: service._id,
                paquete,
                netflix,
                costo,
                tipoPago
            })

            return instInternet.save()
        })
        .then(saved => res.sendStatus(201))
        .catch(err => res.sendStatus(400))
})

// Editar servicio 0
app.post("/api/servicios/0/editar", (req, res) => {

    const { _id, tecnico, data } = req.body;
    let _service

    Servicios.findById(_id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            service.tecnico = tecnico;
            return service.save();
        })
        .then(done => {
            _service = done;
            return InstInternet.findOne({ servicio: _id })
        })
        .then(detalle => {
            const { paquete, netflix, costo, tipoPago } = data;
            detalle.paquete = paquete;
            detalle.netflix = netflix;
            detalle.costo = costo;
            detalle.tipoPago = tipoPago;
            return detalle.save();
        })
        .then(edited => res.status(201).json(_service))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})

// finalizar servicio
app.post("/api/servicios/0/visita", (req, res) => {

    const { id, material, mastil, sector, fecha } = req.body;
    let _service;
     
    Servicios.findById(id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            service.fechaConclusion = fecha;
            service.sc = true;
            return service.save();
        })
        .then(saved => {
            _service = saved;
            return InstInternet.findOne({ servicio: id })
        })
        .then(service => {
            service.material = material;
            service.mastil = mastil;
            service.sector = sector

            return service.save();
        })
        .then(saved => res.status(200).json(_service))
        .catch(err => {
            if (err === 404 || err.name && err.name === "CastError") {
                res.sendStatus(404);
            }
            
            res.sendStatus(500);
        })
})

module.exports = app;