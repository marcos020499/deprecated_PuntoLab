var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// mongo connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(done => console.log("> Connected to mongoDB"))
    .catch(err => console.log(err));

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
process.env.DEPLOY_TYPE == "DEV" ? app.use(cors()) : null

// rutas
app.use(require("./routes/API/clientes"));

// servir la app con express
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en " + process.env.PORT);
});