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
app.use(require("./routes/API/auth"));
app.use(require("./routes/API/clientes"));
app.use(require("./routes/API/usuarios"));
app.use(require("./routes/API/servicios"));
app.use(require("./routes/API/evidencias"));
app.use(require("./routes/API/servicios/servicio0"));
app.use(require("./routes/API/servicios/servicio1"));
app.use(require("./routes/API/servicios/servicio2"));
app.use(require("./routes/API/servicios/servicio3"));

// servir la app con express
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en " + process.env.PORT);

    // to instal initial user if dont exist
    const Usuarios = require("./models/Usuarios")
    const bcrypt = require("bcrypt");
    Usuarios.find({})
        .then(users => {
            if (users && users.length > 0) {
                return;
            }

            const newUsuario = new Usuarios({
                nombre: "Administrador",
                usuario: "admin",
                password: bcrypt.hashSync("1234", 7),
                permisos: 0
            });

            return newUsuario.save();
        })
        .catch(err => console.log(err))
});