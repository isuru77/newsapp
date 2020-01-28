var mysql = require("mysql");
const config = require("config");
const dbConfig = config.get("dbConfig");
const { connectionLimit, user, host, password, database } = dbConfig;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });