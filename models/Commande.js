//CONNEXION WITH ORM SEQUELIZE, AND CREATION OF USER TABLE
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection");

const Commande = db.define("Commande", {

    no_commande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    });

module.exports = Commande;