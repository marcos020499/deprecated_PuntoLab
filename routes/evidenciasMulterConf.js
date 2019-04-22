var crypto = require("crypto");
var mime = require("mime-types");
var multer = require("multer");

var storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        try {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return cb(err);
                cb(
                    null,
                    raw.toString("hex") + Date.now() + "." + mime.extension(file.mimetype)
                );
            });
        } catch (error) {
            console.log(error);
        }
    }
});
var upload = multer({ storage });

module.exports = upload;