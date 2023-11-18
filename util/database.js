const Sequelize = require("sequelize");

const sequelize = new Sequelize("sql8662649", "sql8662649", "7pZZVg1PQ4", {
  dialect: "mysql",
  host: "sql8.freemysqlhosting.net",
});

module.exports = sequelize;

// const sequelize = new Sequelize("expensetracker", "root", "sharp", {
//   dialect: "mysql",
//   host: "localhost",
// });
