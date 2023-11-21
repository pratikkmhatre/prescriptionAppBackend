const Patient = require("../models/patients");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const patient = jwt.verify(token, "secretkey");
    console.log("Patient >>>> ", patient.id);
    Patient.findByPk(patient.id).then((patient) => {
      req.patient = patient; ///ver
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
    // err
  }
};

module.exports = {
  authenticate,
};
