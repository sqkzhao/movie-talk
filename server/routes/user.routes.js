const UserController = require("../controllers/user.controller")

module.exports = function(app) {
    app.get('/', UserController.index)
    app.get('/users', UserController.getAllUsers)
    app.post("/users", UserController.createUser)
    app.get("/users/:id", UserController.getOneUser)
    app.delete("/users/:id", UserController.deleteUser)
    app.put("/users/:id", UserController.editUser)
}