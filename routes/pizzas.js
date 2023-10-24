var express = require('express');
var router = express.Router();
const Pizza = require('../models/Pizza');
const authenticateToken = require('../middlewares/authenticateToken');
const { hashPassword } = require('../middlewares/bcrypt')
const { comparePassword } = require('../middlewares/bcrypt')


/* GET pizzas listing. */
//url: http://localhost:3000/pizzas
router.get('/', async function(req, res, next) {
  try {
    const pizzas = await Pizza.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    console.log('pizzas', pizzas);
    if (!pizzas || pizzas.length === 0) {
      return res.status(404).json({ message: 'Aucune pizza trouvée !' });
    } else {
      return res.status(200).json(pizzas);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des pizzas');
  }
});

module.exports = router;