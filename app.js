var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const db = require("./models/connection"); //pour se connecter à la base de données, et créer une instance de sequelize
const User = require("./models/User");

//synchroniser la table User avec la base de données
db.sync({ alter: true }) //autorisé à modifier la table
  .then(() => console.log("La table User a été créée avec succès"))
  .catch(
    (
      error
    ) =>
      console.error(
        "Une erreur s'est produite lors de la création de la table User :",
        error
      )
  );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

module.exports = app;
