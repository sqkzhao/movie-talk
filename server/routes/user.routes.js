const UserController = require("../controllers/user.controller")

module.exports = function(app) {
    app.get('/', UserController.index)
    app.get('/users', UserController.getAllUsers)
    app.post("/users", UserController.createUser)
    // app.get("/users/:id", function(req, res) {
    //     UserController.getOneUser
    // })
    // app.delete("/users/:id", function(req, res) {
    //     UserController.deleteUser
    // })
    // app.put("/users/:id", function(req, res) {
    //     UserController.editUser
    // })
}