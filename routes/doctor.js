const express = require("express");

const doctorController = require("../controller/doctor");

const fileUpload = require("../util/fileUpload");

const router = express.Router();

router.post("/signup", fileUpload("./storage/images"), doctorController.signup);

router.post("/login", doctorController.login);

router.get("/consultationlist/:id", doctorController.getConsultation);

router.get("/getdetails/:id", doctorController.getDetails);

module.exports = router;
