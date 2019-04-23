// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../../models/Servicios")
const SoporteInternet = require("../../../models/SoporteInternet");

// middleware para subir las evidencias
const uploadEvidencia = require("../../evidenciasMulterConf");
const UploadEvidencia = uploadEvidencia.fields([
    { name: "picture", maxCount: 1 }
]);

// Nuevo servicio 3 - Soporte Internet
app.post("/api/servicios/3/nuevo", (req, res) => {
    const { cliente, tecnico, tipo, data, fechaTentativa, fechaSolicitud } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa, fechaSolicitud })

    servicio.save()
        .then(service => {

            const { problema } = data;

            const soporteInternet = new SoporteInternet({
                servicio: service._id,
                problema
            })

            return soporteInternet.save();
        })
        .then(saved => res.sendStatus(201))
        .catch(err => res.sendStatus(400))
})

// Editar servicio 2
app.post("/api/servicios/3/editar", (req, res) => {

    const { _id, tecnico, data } = req.body;
    let _service;

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
            return SoporteInternet.findOne({ servicio: _id })
        })
        .then(detalle => {
            const { problema } = data;
            detalle.problema = problema;
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
app.post("/api/servicios/3/visita", UploadEvidencia, (req, res) => {

    let image = undefined;
    if (req.files && req.files.picture) {
        image = req.files.picture[0].filename
    }

    const { id, problemaReal, fecha } = req.body;
    let _service;

    Servicios.findById(id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            service.fechaConclusion = fecha;
            service.sc = true;
            service.image = image;
            return service.save();
        })
        .then(saved => {
            _service = saved;
            return SoporteInternet.findOne({ servicio: id })
        })
        .then(service => {
            service.problemaReal = problemaReal;

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