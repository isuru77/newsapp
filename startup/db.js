var mysql = require("mysql");
const config = require("config");
const dbConfig = config.get("dbConfig");
const { connectionLimit, user, host, password, database } = dbConfig;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

// const mysql = require("mysql");
// const config = require("config");

// console.log(config.get("dbConfig"));

// module.exports = function() {
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "isuru",
//     password: "123",
//     database: "newsapp"
//   });

//   connection.connect(err => {
//     if (err) console.log("ERROR", err);
//     console.log("Connected!");
//     var sql = `CREATE TABLE users (
//             user_id INT(11) NOT NULL AUTO_INCREMENT,
//             first_name VARCHAR(30) NOT NULL,
//             last_name VARCHAR(30) NOT NULL,
//             birthday DATE,
//             email VARCHAR(30) NOT NULL,
//             is_admin BOOLEAN DEFAULT false,
//             CONSTRAINT users_pk PRIMARY KEY (user_id)
//         )`;
//     connection.query(sql, function(err, result) {
//       if (err) console.log("ERROR", err);
//       console.log("Table created");
//     });
//   });
// };
