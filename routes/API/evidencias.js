// modules
const express = require("express");
const app = express.Router();
const path = require("path");

app.get("/api/photo/:name", (req, res) => {

    const nombre = req.params.name;

    res.sendFile(path.join(__dirname + "../../../images/" + nombre))

})

module.exports = app;
