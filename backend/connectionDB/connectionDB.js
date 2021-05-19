const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// connect if u don't use env

// const sequelize = new Sequelize({
//   database: 'ttg_test',
//   username: 'ttg_tester',
//   password: 'wx4niKwiF8GAvB',
//   host: process.env.HOST || "139.180.217.51",
//   port: '5432',
//   dialect: 'postgres',
//   dialectOptions: {
//       ssl: false
//   },
//   define: {
//       freezeTableName: true
//   }
// })

// test connection
// const connection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection successfully");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// connection();

module.exports = sequelize;
