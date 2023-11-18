const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//id, name , password, phone number, role

const Patient = sequelize.define("patient", {
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
  age: Sequelize.STRING,
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
  historyOfSurgery: {
    type: Sequelize.STRING,
  },
  historyOfIllness: {
    type: Sequelize.STRING,
  },
  password: Sequelize.STRING,
});

module.exports = Patient;
