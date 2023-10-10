//CONNEXION WITH ORM SEQUELIZE, AND CREATION OF USER TABLE
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection");

const Pizza = db.define("Pizza", {

        no_pizza: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description : {
            type: DataTypes.STRING,
            allowNull: false,
        },

        prix: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

    });

module.exports = Pizza;