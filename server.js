var express = require("express");
var app = express();
var path = require("path");

// servir la app con express
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en " + process.env.PORT);
});