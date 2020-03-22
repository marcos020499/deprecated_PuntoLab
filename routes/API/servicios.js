// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos");
const fs = require("fs");
const path = require("path");

// models
const Servicios = require("../../models/Servicios")
const InstInternet = require("../../models/instalacionInternet");
const InstCamaras = require("../../models/instalacionCamaras");
const Soporte = require("../../models/Soporte");
const SoporteInternet = require("../../models/SoporteInternet");

// API Request validator
const APIAuth = require("../APIAuth");

// lista la tabla principal de servicios
app.post("/api/servicios/listar", APIAuth.validate, (req, res) => {

    const { itemsToShow, salto, tecnico_id } = req.body;
    let totalItems;
    let criterio = {}
    if (tecnico_id) {
        criterio = { tecnico: tecnico_id }
    }

    Servicios.countDocuments(criterio)
        .then(_totalItems => {
            totalItems = _totalItems;
            return Servicios.find(criterio).sort({ fechaTentativa: 'asc' }).skip(Number(salto)).limit(Number(itemsToShow)).populate("cliente");
        })
        .then(servicios => res.status(200).json({ servicios, totalItems }))
        .catch(err => res.sendStatus(400))
})

// lista los clientes con servicio de internet contratado
app.get("/api/servicios/internet/listar", APIAuth.validate, (req, res) => {

    InstInternet
        .find()
        .populate({ 
            path: 'servicio',
            populate: {
            path: 'cliente',
            model: 'clientes'
            } 
        })
        .then(servicios => res.status(200).json(servicios))
        .catch(err => res.sendStatus(400))
})

// lista la tabla principal de servicios
app.get("/api/servicios/detallar/:id", APIAuth.validate, (req, res) => {

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
app.post("/api/servicios/eliminar", APIAuth.validate,(req, res) => {
    
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
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            const filename = service.image || null;
            if (!filename) {
                return;
            }

            // eliminar la foto
            try {
                return fs.unlinkSync(path.join(__dirname + "../../../images/" + filename))
            } catch (error) {
                console.log(error);
                return true;
            }
        })
        .then(photo_deleted => {
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
            if (err == 401 || err == 404) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})

// re agendar servicio
app.post("/api/servicios/reagendar", APIAuth.validate, (req, res) => {

    const { _id, fecha, nuevaFecha } = req.body;

    Servicios.findById(_id)
        .then(service => {
            if (!service) {
                return Promise.reject(404);
            }

            if (service.sc) {
                return Promise.reject(401);
            }

            service.fechaReagendado = fecha;
            service.fechaTentativa = nuevaFecha;
            return service.save();
        })
        .then(saved => res.status(200).json(saved))
        .catch(err => {
            if (err == 404 || err.name && err.name == "CastError") {
                return res.sendStatus(404);
            } else if(err == 401){
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

// lista los servivios proximos a vencerse
app.post("/api/servicios/alerta", APIAuth.validate, (req, res) => {

    const { _id, fechaMayor, fechaMenor } = req.body;

    // falta filtrar por id tecnico
    Servicios.find({ tecnico: _id, fechaTentativa: { $gte: String(fechaMayor), $lt: String(fechaMenor) } }).populate("cliente").sort({ fechaTentativa: "asc" })
        .then(servicios => {
            if (servicios) {
                return res.status(200).json(servicios);
            }

            return res.sendStatus(500);
        })
        .catch(err => res.sendStatus(500))
})

module.exports = app;