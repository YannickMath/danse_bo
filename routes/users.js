var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticateToken = require("../middlewares/authenticateToken");
const bcrypt = require('bcrypt');
const { where } = require("sequelize");

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password: ", error);
    throw error; // Rethrow so that calling function can handle the error appropriately
  }
};

// Exemple d'utilisation
const password = "mySecurePassword";
hashPassword(password);
console.log("password", password);




const comparePassword = (password) => {
  try {
    const match = bcrypt.compare(password, hash);
    console.log("match", match);
    return match;
  } catch (error) {
    console.error("Error comparing passwords: ", error);
    throw error; // Rethrow so that calling function can handle the error appropriately
  }
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//signup
//url: http://localhost:3000/users/signup
router.post("/signup", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
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
    const token = jwt.sign({ name, email, password }, "secretKey", {
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
