// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos");

// models
const Servicios = require("../../models/Servicios")
const InstInternet = require("../../models/instalacionInternet");
const InstCamaras = require("../../models/instalacionCamaras");
const Soporte = require("../../models/Soporte");
const SoporteInternet = require("../../models/SoporteInternet");

// lista la tabla principal de servicios
app.post("/api/servicios/listar", (req, res) => {

    const { itemsToShow, salto } = req.body;

    let totalItems;

    Servicios.find({}).select("_id")
        .then(_totalItems => {
            totalItems = _totalItems.length;
            return Servicios.find({}).sort({ fechaSolicitud: 'desc' }).skip(Number(salto)).limit(Number(itemsToShow)).populate("cliente");
        })
        .then(servicios => res.status(200).json({ servicios, totalItems }))
        .catch(err => res.sendStatus(400))
})

// lista la tabla principal de servicios
app.get("/api/servicios/detallar/:id", (req, res) => {

    const { id } = req.params;
    let _service;

    Servicios.findById(id).populate("cliente")
        .then(service => {
            if (!service) {
              return res.sendStatus(404);
            }

            _service = service;

            switch (service.tipo) {
                case "0":
                    return InstInternet.findOne({ servicio: service._id })
                case "1":
                    return InstCamaras.findOne({ servicio: service._id })
                case "2":
                    return Soporte.findOne({ servicio: service._id })
                case "3":
                    return SoporteInternet.findOne({ servicio: service._id })
                default:
                    break; 
            }
        })
        .then(details => {
            return res.status(200).json({ service: _service, details });
        })
        .catch(err => {
            if (err.name && err.name == "CastError") {
                return res.sendStatus(404)
            }
            return res.sendStatus(500)
        });
})

// eliminar servicios
app.post("/api/servicios/eliminar", (req, res) => {

    const { id, type, password } = req.body;
    let admin = {};

    permisoAdmin.validar(password)
        .then(_admin => {
            if (!_admin) {
                return Promise.reject(401);
            }

            admin = _admin.usuario;
            return Servicios.findByIdAndDelete(id);
        })
        .then(done => {
            switch (type) {
                case "0":
                    return InstInternet.findOneAndDelete({ servicio: id })
                case "1":
                    return InstCamaras.findOneAndDelete({ servicio: id })
                case "2":
                    return Soporte.findOneAndDelete({ servicio: id })
                case "3":
                    return SoporteInternet.findOneAndDelete({ servicio: id })
                default:
                    break;
            }
        })
        .then(deleted => res.status(200).json({ admin }))
        .catch(err => {
            if (err == 401) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})

/////////////////////////////////////////////////
///// EDITAR SERVICIOS
/////////////////////////////////////////////////

// Editar servicio 0
app.post("/api/servicios/0/editar", (req, res) => {

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
        .then(edited => res.sendStatus(201))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
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

// Editar servicio 2
app.post("/api/servicios/3/editar", (req, res) => {

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
            return SoporteInternet.findOne({ servicio: _id })
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

/////////////////////////////////////////////////
///// CREAR SERVICIOS
/////////////////////////////////////////////////

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
        .catch(err => {
            console.log(err);
            
            res.sendStatus(400);
        })
})

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

module.exports = app;