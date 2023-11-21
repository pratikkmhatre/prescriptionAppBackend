const Patient = require("../models/patients");
const Doctors = require("../models/doctors");
const Consultation = require("../models/consulations");
const Prescript = require("../models/prescriptions");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");

require("dotenv").config();

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

//signup for patient
// const signup = async (req, res) => {
//   console.log(req.file);
//   try {
//     const {
//       name,
//       age,
//       email,
//       phoneNo,
//       historyOfSurgery,
//       historyOfIllness,
//       password,
//     } = req.body;
//     let imgUrl;
//     if (req.file) {
//       imgUrl = `storage/images/${req.file.filename}`;
//     }

//     console.log("email", email);
//     if (
//       isstringinvalid(name) ||
//       isstringinvalid(email || isstringinvalid(password))
//     ) {
//       return res
//         .status(400)
//         .json({ err: "Bad parameters . Something is missing" });
//     }
//     await Patient.create({
//       profileImage: imgUrl,
//       name,
//       age,
//       email,
//       phoneNo,
//       historyOfSurgery,
//       historyOfIllness,
//       password,
//     });
//     res.status(201).json({ message: "Patient registration successful" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const generateAccessToken = (id, name) => {
  return jwt.sign({ patientId: id, name: name }, "secretkey");
};

//login for patient
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email id or password is missing ", success: false });
    }
    console.log(password);
    const patient = await Patient.findAll({
      where: { email: req.body.email, password: req.body.password },
    });
    if (patient.length > 0) {
      if (patient) {
        return res.status(200).json({
          success: true,
          message: "Patient logged in successfully",
          token: generateAccessToken(
            patient[0].id,
            patient[0].name,
            patient[0].profileImage
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
        .json({ success: false, message: "Patient does not exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

//patient dashboard data
const patientDashboard = async (req, res) => {
  try {
    const doctorList = await Doctors.findAll();
    res.status(200).json(doctorList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//get patients
const getPatient = async (req, res) => {
  const patientId = req.params.id;
  console.log(patientId);
  try {
    const patientData = await Patient.findOne({
      where: { id: patientId },
    }).then((patient) => {
      res.status(200).json(patient);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//create new consultation
const newConsultation = async (req, res) => {
  console.log(req.familyHistory);
  const {
    historyOfSurgery,
    historyOfIllness,
    allergies,
    others,
    familyHistory,
    patientId,
    transactionId,
  } = req.body;
  const docId = req.params.doctorId;
  try {
    await Consultation.create({
      historyOfSurgery,
      historyOfIllness,
      familyHistory,
      allergies,
      others,
      doctorId: docId,
      patientId,
      transactionId,
    });
    res.status(201).json({ message: "Consultation added" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPrescription = async (req, res) => {
  const patientID = req.params.id;
  try {
    const prescriptions = await Prescript.findAll({
      where: { patientId: patientID },
    });
    res.status(200).json(prescriptions);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// //Payment for consultation
// const feePayment = async (req, res) => {
//   try {
//     var rzp = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//     const amount = 60000;

//     rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
//       if (!err) {
//         return res.status(201).json({ order, key_id: rzp.key_id });
//       } else {
//         throw new Error(JSON.stringify(err));
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({ message: "Something went wrong", error: err });
//   }
// };

module.exports = {
  // signup,
  login,
  patientDashboard,
  newConsultation,
  getPatient,
  getPrescription,
};
