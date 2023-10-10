var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middlewares/authenticateToken");
const { hashPassword } = require("../middlewares/bcrypt");
const { comparePassword } = require("../middlewares/bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    const users = User.findAll();
   if(!users){
     return res.status(404).json({message: "Aucun utilisateur trouvé !"})
    } else {
      console.log("users", users);
      return res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});



//signup
//url: http://localhost:3000/users/signup
router.post("/signup", hashPassword, async function (req, res, next) {
  try {
    const { name, email } = req.body;
    const password = req.hashedPassword;
    const existingUser = await User.findOne({ where: { email } });
    // console.log("existingUser", existingUser);
    // console.log("req.body", req.body);
    // console.log("where", where);

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

    // console.log("token", token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'inscription");
  }
});

module.exports = router;
