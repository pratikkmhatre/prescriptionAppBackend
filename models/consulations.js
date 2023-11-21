const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Consultation = sequelize.define("consultation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  historyOfSurgery: Sequelize.STRING,
  historyOfIllness: Sequelize.STRING,
  familyHistory: Sequelize.STRING,
  allergies: Sequelize.STRING,
  others: Sequelize.STRING,
  patientId: Sequelize.STRING,
  transactionId: Sequelize.STRING,
});

module.exports = Consultation;
