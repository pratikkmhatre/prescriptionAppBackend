const Patient = require("../models/patients");
const Doctor = require("../models/doctors");
const Consultation = require("../models/consulations");
const Prescript = require("../models/prescriptions");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const pdfService = require("../util/pdfbuild");
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
    // form.parse(req, (err, fields, files) => {
    //   console.log("fields: ", fields);
    //   console.log("files: ", files);
    //   res.send({ success: true });
    // });
    const { name, speciality, email, phoneNo, experience, password } = req.body;
    let imgUrl;
    if (req.file) {
      imgUrl = `storage/images/${req.file[0].filename}`;
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
// const signup = async (req, res) => {
//   console.log(req.file);
//   try {
//     const { name, speciality, email, phoneNo, experience, password } = req.body;
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
//     await Doctor.create({
//       profileImage: imgUrl,
//       name,
//       speciality,
//       email,
//       phoneNo,
//       experience,
//       password,
//     });
//     res.status(201).json({ message: "Doctor registered successfully" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

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

//Creating new prescriptions by doctor
const createPrescriptions = async (req, res) => {
  console.log(req.body.doctor);
  try {
    const patientId = req.params.id;
    const { care, medicines, doctor } = req.body;

    await Prescript.create({
      care,
      medicines,
      doctor,
      patientId,
    });
    res.status(201).json({ message: "Prescription generated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPrescription = async (req, res) => {
  let drname = req.params.name;
  try {
    const prescripts = await Prescript.findAll({
      where: { doctor: drname },
    });
    res.status(200).json(prescripts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateprescriptions = async (req, res) => {
  let drname = req.params.name;
  const { care, medicines } = req.body;
  try {
    await Prescript.update(
      { care: care, medicines: medicines },
      {
        where: {
          doctor: drname,
        },
      }
    );
    res.status(200).json({ message: "Prescription updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const downloadPDF = (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=prescription.pdf",
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
};

module.exports = {
  signup,
  login,
  getConsultation,
  getDetails,
  createPrescriptions,
  getPrescription,
  updateprescriptions,
  downloadPDF,
};
