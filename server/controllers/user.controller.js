const {User} = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {secretKey} = require("../config/jwt.config")

module.exports.index = (req, res) => {
    res.json({ msg: "hello" })
}

module.exports.getAllUsers = (req,res) => {
    User.find({})
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err))
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
module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                res.json({msg: "User not found"})
            }
            else{
                bcrypt
                    .compare(req.body.password, user.password)
                        .then(isPasswordValid => {
                            if(isPasswordValid){
                                const newJWT = jwt.sign({_id: user._id}, secretKey)
                                res.cookie("usertoken", newJWT, {httpOnly: true})
                                    .json({msg: "Login success"})
                            }
                            else{
                                res.json({msg: "Password not valid"})
                            }
                        })
                        .catch(err => res.json({msg: "Password not valid"}))
            }
        })
        .catch(err => res.json(err))
}
// LOGOUT
module.exports.logout = (req, res) => {
    res.clearCookie("usertoken")
}

module.exports.getOneUser = (req,res) => {
    const {id} = req.params
    User.findOne({_id:id})
        .then(oneUser => res.json(oneUser))
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