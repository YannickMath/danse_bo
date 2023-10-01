const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) res.status(400).send("No password provided");

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.error("Error hashing password: ", error);
    res.status(500).send("Error hashing password");
  }
};

// Exemple d'utilisation
const password = "mySecurePassword";
hashPassword(password);
console.log("password", password);

const comparePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { hash } = req.params;

    if (!password) res.status(400).send("No password provided");

    const match = bcrypt.compare(password, hash);
    console.log("match", match);
    if (!match) res.status(400).send("Passwords do not match");

    next();
  } catch (error) {
    console.error("Error comparing passwords: ", error);
    res.status(500).send("Error comparing passwords");
  }
};
