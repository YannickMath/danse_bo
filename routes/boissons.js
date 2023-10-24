var express = require('express');
var router = express.Router();
const Boisson = require('../models/Boisson');
const authenticateToken = require('../middlewares/authenticateToken');
const { hashPassword } = require('../middlewares/bcrypt')
const { comparePassword } = require('../middlewares/bcrypt')


/* GET boissons listing. */
//url: http://localhost:3000/boissons
router.get('/', async function(req, res, next) {
  try {
    const boissons = await Boisson.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    console.log('boissons', boissons);
    if (!boissons || boissons.length === 0) {
      return res.status(404).json({ message: 'Aucune boisson trouvée !' });
    } else {
      return res.status(200).json(boissons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des boissons');
  }
});

module.exports = router;
