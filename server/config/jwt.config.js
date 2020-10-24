const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;
module.exports.secretKey = secret;

// PROTECTED
module.exports.authenticate = (req, res, next) => {
  // console.log("COOKIE: ",req.cookies)
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}