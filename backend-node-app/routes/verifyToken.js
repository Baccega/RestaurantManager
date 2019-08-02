const jwt = require("jsonwebtoken");


//Da esportare per le autenticazioni

//router.get('/', [Nome dell'export], (req, res) =>{});

exports.module = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    req.status(400).send("Invalid Token");
  }
};
