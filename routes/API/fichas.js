// modules
const express = require("express");
const app = express.Router();
const permisoAdmin = require("../permisosAdministrativos");

// API Request validator
const APIAuth = require("../APIAuth");

// models
const Fichas = require("../../models/Fichas")

// listar fichas
app.get("/api/fichas/listar", APIAuth.validate, (req, res) => {

    Fichas.find()
        .then(fichas => res.status(200).json(fichas))
        .catch(err => res.sendStatus(500));
});

// crear fichas
app.post("/api/fichas/nuevo", APIAuth.validate, (req, res) => {

    const newFicha = new Fichas(req.body);

    newFicha.save()
        .then(ficha => res.status(201).json(ficha))
        .catch(err => res.sendStatus(400))
});

// eliminar ficha
app.post("/api/fichas/eliminar", APIAuth.validate, (req, res) => {
    const { password, _id } = req.body;
    let admin = {};

    permisoAdmin.validar(password)
        .then(_admin => {
            if (!_admin) {
                return Promise.reject(401);
            }
            
            admin = _admin.usuario;
            return Fichas.findByIdAndDelete(_id);
        })
        .then(deleted => res.status(200).json({ admin }))
        .catch(err => {
            if (err == 401 || err == 302) {
                return res.sendStatus(err)
            }
            return res.sendStatus(500);
        })
});

// editar ficha ------------
app.post("/api/pv/editar", APIAuth.validate, (req, res) => {

    const { _id, nombre, localidad, antena, enlace, router, ip } = req.body;

    Fichas.findById(_id)
        .then(ficha => {
            if (!ficha) {
                return Promise.reject(404);
            }

            ficha.nombre = nombre;
            ficha.cantidad = cantidad;
            ficha.prefijo = prefijo;
            ficha.costoFicha = costoFicha;
            ficha.plan = plan;
            ficha.fichasVendidas = fichasVendidas;
            ficha.totalCobrado = totalCobrado;
            ficha.comision = comision;
            ficha.gananciaNeta = gananciaNeta;
            ficha.errorFicha = errorFicha;
            ficha.errorFichaFolio = errorFichaFolio;

            return ficha.save()
        })
        .then(ficha_editada => res.sendStatus(200))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }
            res.sendStatus(500);
        })
});

module.exports = app;