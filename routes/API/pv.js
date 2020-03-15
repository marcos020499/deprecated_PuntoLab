// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos");

// API Request validator
const APIAuth = require("../APIAuth");

// models
const PuntodeVenta = require("../../models/PuntoDeVenta")
const Fichas = require("../../models/Fichas")

// listar pv
app.get("/api/pv/listar", APIAuth.validate, (req, res) => {
    PuntodeVenta.find()
        .then(pv => res.status(200).json(pv))
        .catch(err => res.sendStatus(500));
});

// detallar pv
app.get("/api/pv/detallar/:_id", APIAuth.validate, (req, res) => {
    const { _id } = req.params

    PuntodeVenta.findById(_id)
        .then(pv => {
            if (!pv) {
                return res.sendStatus(404);
            }

            return res.status(200).json(pv)
        })
        .catch(err => {
            if (err.name && err.name == "CastError") {
                return res.sendStatus(404)
            }
            return res.sendStatus(500)
        });
})

// crear pv
app.post("/api/pv/nuevo", APIAuth.validate, (req, res) => {

    const newPV = new PuntodeVenta(req.body);

    newPV.save()
        .then(pv => res.status(201).json(pv))
        .catch(err => res.sendStatus(400))
});

// editar pv
app.post("/api/pv/editaro", APIAuth.validate, (req, res) => {

    const { _id, nombre, localidad, antena, enlace, router, ip } = req.body;

    PuntodeVenta.findById(_id)
        .then(pv => {
            if (!pv) {
                return Promise.reject(404);
            }

            pv.nombre = nombre;
            pv.localidad = localidad;
            pv.antena = antena;
            pv.enlace = enlace;
            pv.router = router;
            pv.ip = ip;

            return pv.save()
        })
        .then(pv_editado => res.sendStatus(200))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }
            res.sendStatus(500);
        })
});

// eliminar pv
app.post("/api/pv/eliminar", APIAuth.validate, (req, res) => {
    const { password, _id } = req.body;
    let admin = {};

    permisoAdmin.validar(password)
        .then(_admin => {
            if (!_admin) {
                return Promise.reject(401);
            }
            
            admin = _admin.usuario;
            return Fichas.countDocuments({ pv: _id });
        })
        .then(rows => {
            if (rows > 0) {
                return Promise.reject(302)
            }

            return PuntodeVenta.findByIdAndDelete(_id);;
        })
        .then(deleted => res.status(200).json({ admin }))
        .catch(err => {
            if (err == 401 || err == 302) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
})

module.exports = app;