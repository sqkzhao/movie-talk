const jwt = require("jsonwebtoken");
const secret = "KEEP THIS SECRET"
module.exports.secretKey = secret;

module.exports.authenticate = (req, res, next) => {
  console.log("COOKIE: ",req.cookies)
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}