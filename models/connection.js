require("dotenv").config();

//utilisation de sequelize : ORM (Object Relational Mapping), simplifie les requêtes SQL

const { Sequelize } = require("sequelize");

const password = process.env.FAST_FOOD_DB_PASSWORD;

const sequelize = new Sequelize("fastfood", "yannick", password, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
