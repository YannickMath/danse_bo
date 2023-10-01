const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //récupère le token

  if (token == null) return res.sendStatus(401);
_KEY
  jwt.verify(token, JWT_PRIVATE, (err, user) => {
    //vérifie le token))
    if (err) return res.sendStatus(403);
    req.user = user; //stock le token dans la requête
    console.log("req.user", req.user);
    console.log("token approuvé");
    console.log("token", token);

    next();
  });
}

module.exports = authenticateToken;
