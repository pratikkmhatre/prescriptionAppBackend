const multer = require("multer");
const path = require("path");

const storage = (destination) =>
  multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

const fileUpload = (destination) =>
  multer({
    storage: storage(destination),
    limits: {
      fileSize: 2 * 1024 * 1024, //2MB
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg files are allowed!"));
      }
    },
    onError: function (err, next) {
      return console.log("error", err);
      next(err);
    },
  }).single("profileImage");

module.exports = fileUpload;
