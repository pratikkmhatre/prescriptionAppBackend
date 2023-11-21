const Sequelize = require("sequelize");

const sequelize = new Sequelize("sql8662649", "sql8662649", "7pZZVg1PQ4", {
  dialect: "mysql",
  host: "sql8.freemysqlhosting.net",
});

// const sequelize = new Sequelize("prescription", "root", "sharp", {
//   dialect: "mysql",
//   host: "localhost",
// });

module.exports = sequelize;
