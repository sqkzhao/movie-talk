const {User} = require("../models/user.model");

module.exports.index = (req, res) => {
    res.json({ msg: "hello" })
}

module.exports.getAllUsers = (req,res) => {
    User.find({})
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err))
}

module.exports.createUser = (req,res) => {
    User.create(req.body)
        .then(newUser => res.json(newUser))
        .catch(err => res.status(400).json(err))
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









// register: (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//         res.json({ msg: "success!", user: user });
//     })
//     .catch(err => res.json(err));
// };

