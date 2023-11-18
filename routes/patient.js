const express = require("express");

const patientController = require("../controller/patient");

const fileUpload = require("../util/fileUpload");

const router = express.Router();

router.post(
  "/signup",
  fileUpload("./storage/images"),
  patientController.signup
);

router.post("/login", patientController.login);

router.get("/dashboard", patientController.patientDashboard);

router.post("/newconsultation/:doctorId", patientController.newConsultation);

router.get("/details/:id", patientController.getPatient);

module.exports = router;
