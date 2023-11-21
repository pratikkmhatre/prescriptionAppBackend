const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Prescript = sequelize.define("prescript", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  care: Sequelize.STRING,
  medicines: Sequelize.STRING,
  doctor: Sequelize.STRING,
  patientId: Sequelize.STRING,
});

module.exports = Prescript;
