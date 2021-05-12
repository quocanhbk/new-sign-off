const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("ttg_test", "ttg_tester", "wx4niKwiF8GAvB", {
//   host: process.env.HOST || "139.180.217.51",
//   dialect: "postgres",
// });
const sequelize = new Sequelize({
  database: 'ttg_test',
  username: 'ttg_tester',
  password: 'wx4niKwiF8GAvB',
  host: process.env.HOST || "139.180.217.51",
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
      ssl: false
  },
  define: {
      freezeTableName: true
  }
})

// test connection
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connection();
module.exports = sequelize;
