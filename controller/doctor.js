const Patient = require("../models/patients");
const Doctor = require("../models/doctors");
const Consultation = require("../models/consulations");
const fs = require("fs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

//signup for doctor
const signup = async (req, res) => {
  console.log(req.file);
  try {
    const { name, speciality, email, phoneNo, experience, password } = req.body;
    let imgUrl;
    if (req.file) {
      imgUrl = `storage/images/${req.file.filename}`;
    }
    console.log("email", email);
    if (
      isstringinvalid(name) ||
      isstringinvalid(email || isstringinvalid(password))
    ) {
      return res
        .status(400)
        .json({ err: "Bad parameters . Something is missing" });
    }
    await Doctor.create({
      profileImage: imgUrl,
      name,
      speciality,
      email,
      phoneNo,
      experience,
      password,
    });
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const generateAccessToken = (id, name) => {
  return jwt.sign({ doctorId: id, name: name }, "secretkey");
};

//login for doctor
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email id or password is missing ", success: false });
    }
    console.log(password);
    const doctor = await Doctor.findAll({
      where: { email: email, password: password },
    });
    if (doctor.length > 0) {
      if (doctor) {
        return res.status(200).json({
          success: true,
          message: "Doctor logged in successfully",
          token: generateAccessToken(
            doctor[0].id,
            doctor[0].name,
            doctor[0].profileImage
          ),
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Doctor does not exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

const getConsultation = async (req, res) => {
  let drId = req.params.id;
  console.log(drId);
  try {
    const consultList = await Consultation.findAll({
      where: { doctorId: drId },
    }).then((list) => {
      res.status(200).json(list);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getDetails = async (req, res) => {
  let drId = req.params.id;
  console.log(drId);
  try {
    const doctor = await Doctor.findOne({
      where: { id: drId },
    }).then((dr) => {
      res.status(200).json(dr);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = {
  signup,
  login,
  getConsultation,
  getDetails,
};
