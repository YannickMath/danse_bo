var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Burger = require("../models/Burger");
const authenticateToken = require("../middlewares/authenticateToken");
const { hashPassword } = require("../middlewares/bcrypt");
const { comparePassword } = require("../middlewares/bcrypt");

/* GET burgers listing. */
//url: http://localhost:3000/burgers
router.get("/", async function (req, res, next) {
  try {
    const burgers = await Burger.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    console.log("burgers", burgers);
    if (!burgers || burgers.length === 0) {
      return res.status(404).json({ message: "Aucun burger trouvé !" });
    } else {
      return res.status(200).json(burgers);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des burgers");
  }
});

module.exports = router;
