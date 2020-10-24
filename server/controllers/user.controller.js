const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const { secretKey } = require("../config/jwt.config")

module.exports.index = (req, res) => {
    res.json({ msg: "hello" })
}

// REGISTRATION
module.exports.register = (req,res) => {
    const user = new User(req.body)
    user
        .save()
        .then(() => {
            res.json({msg: "Register success", user: user})
        })
        .catch(err => res.status(400).json(err))
}

// LOGIN
module.exports.login = async (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.json({ msg: "USER NOT FOUND" });
      } 
      else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              // CREATE A NEW JWT IF PASSWORD & EMAIL MATCH
              const newJWT = jwt.sign({
                    _id: user._id
              }, secretKey)
              // SENDS THE NEW JWT BACK TO USER
              res
                .cookie("usertoken", newJWT, {httpOnly: true})
                .json({ msg: "success!", id: user._id });
            } 
            else {
              res.json({ msg: "PASSWORD NOT VALID" });
            }
          })
          .catch(err => res.json({ msg: "PASSWORD ERROR" }));
      }
    })
    .catch(err => res.json(err));
}

// LOGOUT
module.exports.logout = (req, res) => {
    res.clearCookie("usertoken")
    res.sendStatus(200);
}

// USERS
module.exports.getAllUsers = (req,res) => {
  User.find({})
      .then(allUsers => res.json(allUsers))
      .catch(err => res.json(err))
}

module.exports.getOneUser = (req,res) => {
    const { id } = req.params
    User.findOne({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.deleteUser = (req,res) => {
    const {id} = req.params;
    User.deleteOne({_id:id})
        .then(deletedResult => res.json(deletedResult))
        .catch(err => res.json(err))
}

module.exports.editUser = (req, res) => {
    const {id} = req.params;
    User.findByIdAndUpdate({_id:id}, req.body, {new:true})
        .then(editedUser => res.json(editedUser))
        .catch(err => res.json(err))
}
