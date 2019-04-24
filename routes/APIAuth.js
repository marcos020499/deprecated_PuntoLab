var jwt = require('jsonwebtoken');
var JWTKey = require("../config/strings").token_string

exports.validate = function (req, res, next) {

    const token = req.get("Authorization");

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWTKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        next();
    });
}