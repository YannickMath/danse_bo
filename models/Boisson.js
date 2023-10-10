//CONNEXION WITH ORM SEQUELIZE, AND CREATION OF USER TABLE
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection");

const Boisson = db.define("Boisson", {

    no_boisson: {
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

module.exports = Boisson;

