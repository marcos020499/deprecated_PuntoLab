// modules
const express = require("express");
const app = express.Router();
const jwt = require('jsonwebtoken');

// config
const JWTKey = require('../../config/strings').token_string;

// models
const Usuarios = require("../../models/Usuarios")

app.post("/api/auth", (req, res) => {
    const { usuario, password } = req.body;

    Usuarios.findOne({ usuario })
        .then(user => {

            if (!user || password != user.password) {
                return Promise.reject(404);
            }

            // hidding password to place it in token ;)
            user.password = undefined;

            // create token
            const token = jwt.sign({ user }, JWTKey);

            return res.status(200).json({ token, user });
        })
        .catch(err => {
            if (err == 404) {
                return res.sendStatus(err);
            }

            return res.sendStatus(400);
        })
})

// token auth
app.post("/api/token/validate", (req, res) => {

    const { token } = req.body

    jwt.verify(token, JWTKey, (err, decoded) => {
        if (err) {
            res.sendStatus(401);
        }

        // if valid send data again
        Usuarios.findById(decoded.user._id)
            .then(user => {
                if (!user) {
                    return res.sendStatus(404);
                }

                user.password = undefined;
                
                return res.status(200).json(user);
            })
            .catch(err => res.sendStatus(400))
    });
});

module.exports = app;