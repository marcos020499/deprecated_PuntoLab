// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../../models/Servicios")
const InstCamaras = require("../../../models/instalacionCamaras");
const Usuarios = require("../../../models/Usuarios")

// middleware para subir las evidencias
const uploadEvidencia = require("../../evidenciasMulterConf");
const UploadEvidencia = uploadEvidencia.fields([
    { name: "picture", maxCount: 1 }
]);

// API Request validator
const APIAuth = require("../../APIAuth");

// Nuevo servicio 1 - Instalación de camaras de seguridad
app.post("/api/servicios/1/nuevo", APIAuth.validate,  (req, res) => {

    const { cliente, tecnico, tipo, data, fechaTentativa, fechaSolicitud, pago_tecnico, show_pago_tecnico } = req.body;
    const pagoTecnico = show_pago_tecnico == true ? pago_tecnico : 0

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa, fechaSolicitud, pagoTecnico })


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
app.post("/api/servicios/1/editar", APIAuth.validate,  (req, res) => {

    const { _id, tecnico, pago_tecnico, show_pago_tecnico, data } = req.body;
    const pagoTecnico = show_pago_tecnico == true ? pago_tecnico : 0
    let _service

    Servicios.findById(_id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            if (service.sc) {
                return Promise.reject(401);
            }

            service.pagoTecnico = pagoTecnico;
            service.tecnico = tecnico;
            return service.save();
        })
        .then(done => {
            _service = done;
            return InstCamaras.findOne({ servicio: _id })
        })
        .then(detalle => {
            const { camaras, costo, tipoPago } = data;
            detalle.camaras = camaras;
            detalle.costo = costo;
            detalle.tipoPago = tipoPago;
            return detalle.save();
        })
        .then(saved => Usuarios.findById(_service.tecnico))
        .then(tecnico => {
            tecnico.pago = tecnico.pago + _service.pagoTecnico;
            return tecnico.save()
        })
        .then(edited => res.status(201).json(_service))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err)
            } else if (err == 401) {
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

// finalizar servicio
app.post("/api/servicios/1/visita", [APIAuth.validate, UploadEvidencia], (req, res) => {

    let image = undefined;
    if (req.files && req.files.picture) {
        image = req.files.picture[0].filename
    }

    const { id, material, mastil, sector, fecha } = req.body;
    let _service;

    Servicios.findById(id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            if (service.sc) {
                return Promise.reject(401);
            }

            service.fechaConclusion = fecha;
            service.sc = true;
            service.image = image;
            return service.save();
        })
        .then(saved => {
            _service = saved;
            return InstCamaras.findOne({ servicio: id })
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
                return res.sendStatus(404);
            } else if (err == 401) {
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

module.exports = app;