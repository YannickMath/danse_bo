require("dotenv").config();

//utilisation de sequelize : ORM (Object Relational Mapping), simplifie les requêtes SQL

const { Sequelize } = require("sequelize");

const password = process.env.DANSE_BO_DB_PASSWORD ;

const sequelize = new Sequelize("danse_bo", "yannick", password, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
