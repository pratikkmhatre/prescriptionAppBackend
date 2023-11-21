const Dcotor = require("../models/doctors");

const authenticateDr = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const doctor = jwt.verify(token, "secretkey");
    console.log("Doctor >>>> ", doctor.id);
    Doctor.findByPk(doctor.id).then((doctor) => {
      req.doctor = doctor; ///ver
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
    // err
  }
};

module.exports = {
  authenticateDr,
};
