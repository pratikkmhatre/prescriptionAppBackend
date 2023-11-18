const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Doctor = sequelize.define("doctor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  profileImage: {
    type: Sequelize.STRING,
    required: false,
  },
  name: Sequelize.STRING,
  speciality: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  experience: Sequelize.DOUBLE,
  password: Sequelize.STRING,
});

module.exports = Doctor;
