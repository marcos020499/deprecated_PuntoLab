// modules
const express = require("express");
const app = express.Router();
const adminPermisos = require("../permisosAdministrativos")

// model
const Servicios = require("../../models/Servicios")

// listar los servicios
app.get("/api/servicios/listar", (req, res) => {

    Servicios.find({})
        .then(servicios => {
            return res.status(200).json(servicios);
        })
        .catch(err => {
            return res.sendStatus(500)
        })
});

// crear servicios
app.post("/api/servicios/nuevo", (req, res) => {
    const { nombre } = req.body;

    const newServicio = new Servicios({
        nombre
    });

    newServicio.save()
        .then(servicio => res.sendStatus(201))
        .catch(err => {
            if (err.code && err.code == 11000) {
                return res.sendStatus(409);
            }
            res.sendStatus(400)
        })
})

// detallar servicio
app.get("/api/servicios/detallar/:_id", (req, res) => {
    const { _id } = req.params

    Servicios.findById(_id)
        .then(servicio => {
            if (!servicio) {
                return res.sendStatus(404)
            }

            return res.status(200).json(servicio)
        })
        .catch(err => {
            if (err.name && err.name == "CastError") {
                return res.sendStatus(404)
            }
            return res.sendStatus(500)
        });
})

// editar servicios
app.post("/api/servicios/editar", (req, res) => {

    const { _id, nombre } = req.body;

    Servicios.findById(_id)
        .then(servicio => {
            if (!servicio) {
                return Promise.reject(404);
            }

            servicio.nombre = nombre
            return servicio.save();
        })
        .then(saved => {
            return res.sendStatus(200);
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            } else if (err.code && err.code == 11000) {
                return res.sendStatus(409);
            }

            return res.sendStatus(500);
        });

})

// eliminar servicios
app.post("/api/servicios/eliminar", (req, res) => {
    const { password, _id } = req.body;

    adminPermisos.validar(password)
        .then(admin => {
            if (!admin) {
                return Promise.reject(404);
            }

            return Servicios.findByIdAndDelete(_id)
        })
        .then(deleted => res.sendStatus(200))
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }

            return res.sendStatus(500);
        })
})

module.exports = app;