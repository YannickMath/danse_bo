//CONNEXION WITH ORM SEQUELIZE, AND CREATION OF USER TABLE
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection");

const Burger = db.define("Burger", {

    no_burger: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    nom: {
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

module.exports = Burger;