const path = require("path");

const express = require("express");
var cors = require("cors");
const sequelize = require("./util/database");
const multer = require("multer");

//models
const Patient = require("./models/patients");
const Doctor = require("./models/doctors");
const Consultation = require("./models/consulations");
const Prescript = require("./models/prescriptions");

//routes
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");

const app = express();

const dotenv = require("dotenv");

// get config vars
dotenv.config();

app.use(cors());

app.use(express.json()); //this is for handling jsons

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//Doctor Signup Code
app.post("/doctor/signup", upload.single("profileImage"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { name, speciality, email, phoneNo, experience, password } = req.body;

    const profile = req.file;
    await Doctor.create({
      profileImage: profile.path,
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
});

//Patient Signup Code
app.post("/patient/signup", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phoneNo,
      historyOfSurgery,
      historyOfIllness,
      password,
    } = req.body;

    const profile = req.file;
    console.log(profile.path);
    await Patient.create({
      profileImage: profile.path,
      name,
      age,
      email,
      phoneNo,
      historyOfSurgery,
      historyOfIllness,
      password,
    });
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//serving of static folders
app.use("/patient/public", express.static(path.join(__dirname, "public")));

app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

Doctor.hasMany(Patient);
Doctor.hasMany(Consultation);

sequelize
  .sync({force:true})
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
