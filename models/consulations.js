const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Consultation = sequelize.define("consultation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  historyOfSurgery: Sequelize.INTEGER,
  historyOfIllness: Sequelize.STRING,
  familyHistory: Sequelize.STRING,
  allergies: Sequelize.STRING,
  others: Sequelize.STRING,
  patientId: Sequelize.STRING,
});

module.exports = Consultation;
