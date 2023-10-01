var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middlewares/authenticateToken");
const { hashPassword } = require("../middlewares/bcrypt");
const { comparePassword } = require("../middlewares/bcrypt");
const { where } = require("sequelize");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

console.log("Route /signup chargée");

//signup
//url: http://localhost:3000/users/signup
router.post("/signup", hashPassword, async function (req, res, next) {
  try {
    const { name, email } = req.body;
    const password = req.hashedPassword;
    const existingUser = await User.findOne({ where: { email } });
    console.log("existingUser", existingUser);
    console.log("req.body", req.body);
    console.log("where", where);

    if (existingUser) {
      return res.status(401).json({ message: "Utilisateur déjà existant !" });
    }

    const user = await User.create({ name, email, password });
    console.log("user creation successful !!", user);

    // create token if data are correct
    const token = jwt.sign({ name, email, password }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });

    // return the JWT token for the future API calls
    res.json({
      success: true,
      message: "Authentication successful!",
      token: token,
    });

    console.log("token", token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'inscription");
  }
});

module.exports = router;
