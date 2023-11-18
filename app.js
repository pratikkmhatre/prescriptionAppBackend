const path = require("path");

const express = require("express");
var cors = require("cors");
const sequelize = require("./util/database");
const multer = require("multer");

const Patient = require("./models/patients");
const Doctor = require("./models/doctors");

const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");

const app = express();
const dotenv = require("dotenv");
const Consultation = require("./models/consulations");

// get config vars
dotenv.config();

app.use(cors());

app.use(express.json()); //this is for handling jsons

// app.use("/patient", express.static("storage/images"));
// app.use("/doctor", express.static("storage/images"));

app.use("/patient/", express.static(path.join(__dirname, "storage/images")));

app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

Doctor.hasMany(Patient);
Doctor.hasMany(Consultation);

// Middleware to handle multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(418).json({
      err_code: err.code,
      err_message: err.message,
    });
  } else {
    return res.status(500).json({
      err_code: 409,
      err_message: "Something went wrong",
    });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
