// modules
const express = require("express");
const app = express.Router();

// models
const Servicios = require("../../models/Servicios")
const InstInternet = require("../../models/instalacionInternet");
const InstCamaras = require("../../models/instalacionCamaras");
const Soporte = require("../../models/Soporte");
const SoporteInternet = require("../../models/SoporteInternet");

// lista la tabla principal de servicios
app.get("/api/servicios/listar", (req, res) => {
    Servicios.find({}).populate("cliente")
        .then(servicios => res.status(200).json(servicios))
        .catch(err => res.sendStatus(400))
})

// Nuevo servicio 0 - Instalación de internet
app.post("/api/servicios/0/nuevo", (req, res) => {

    const { cliente, tecnico, tipo, data, fechaTentativa } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa })

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

// Nuevo servicio 1 - Instalación de camaras de seguridad
app.post("/api/servicios/1/nuevo", (req, res) => {

    const { cliente, tecnico, tipo, data, fechaTentativa } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa })

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

// Nuevo servicio 2 - Soporte general
app.post("/api/servicios/2/nuevo", (req, res) => {
    const { cliente, tecnico, tipo, data, fechaTentativa } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa })

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

// Nuevo servicio 3 - Soporte Internet
app.post("/api/servicios/3/nuevo", (req, res) => {
    const { cliente, tecnico, tipo, data, fechaTentativa } = req.body;

    const servicio = new Servicios({ cliente, tecnico, tipo, fechaTentativa })

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


module.exports = app;