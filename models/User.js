//CONNEXION WITH ORM SEQUELIZE, AND CREATION OF USER TABLE
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

if (db) {
  console.log("Connexion à postgresql réussie");
} else {
  console.log("Accès à postgresql impossible");
}

module.exports = User;
