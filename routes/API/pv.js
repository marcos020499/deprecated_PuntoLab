// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos");

// API Request validator
const APIAuth = require("../APIAuth");

// models
const PuntodeVenta = require("../../models/PuntoDeVenta")

// listar pv
app.get("/api/pv/listar", APIAuth.validate, (req, res) => {
    PuntodeVenta.find()
        .then(pv => res.status(200).json(pv))
        .catch(err => res.sendStatus(500));
});

// crear pv
app.post("/api/pv/nuevo", APIAuth.validate, (req, res) => {

    const newPV = new PuntodeVenta(req.body);

    newPV.save()
        .then(pv => res.status(201).json(pv))
        .catch(err => res.sendStatus(400))
});

// editar pv
app.post("/api/pv/editar", APIAuth.validate, (req, res) => {

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
            return PuntodeVenta.findByIdAndDelete(_id);
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