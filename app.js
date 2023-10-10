var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require("./models/connection");


const db = require("./models/connection"); //pour se connecter à la base de données, et créer une instance de sequelize
const User = require("./models/User");
const Burger = require("./models/Burger");

//test de la connexion de sequelize à la base de données
sequelize.authenticate();
  console.log('Connection has been established successfully by sequelize.');


//synchroniser la table User avec la base de données
db.sync({ alter: true }) //autorisé à modifier la table
  .then(() => console.log("Successful connection with database !"))
  .catch(
    (
      error
    ) =>
      console.error(
        "An error occure and connection to database failed :",
        error
      )
  );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var burgersRouter = require('./routes/burgers');


var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/burgers', burgersRouter);

module.exports = app;
