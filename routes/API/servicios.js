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

    Servicios.countDocuments()
        .then(_totalItems => {
            totalItems = _totalItems;
            return Servicios.find({}).sort({ fechaSolicitud: 'desc' }).skip(Number(salto)).limit(Number(itemsToShow)).populate("cliente");
        })
        .then(servicios => res.status(200).json({ servicios, totalItems }))
        .catch(err => res.sendStatus(400))
})

// lista la tabla principal de servicios
app.get("/api/servicios/detallar/:id", (req, res) => {

    const { id } = req.params;
    let _service;

    Servicios.findById(id).populate("cliente tecnico")
        .then(service => {
            if (!service) {
              return Promise.reject(404);
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
            if (err == 404 || err.name && err.name == "CastError") {
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

module.exports = app;