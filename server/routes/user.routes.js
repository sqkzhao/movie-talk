const UserController = require("../controllers/user.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = function(app) {
    app.get('/', UserController.index)
    app.get('/users', authenticate, UserController.getAllUsers)
    // REGISTER
    app.post("/users", UserController.register)
    // LOGIN
    app.post("/login", UserController.login)
    // LOGOUT
    app.get("/logout", UserController.logout)
    app.get("/users/:id", UserController.getOneUser)
    app.delete("/users/:id", UserController.deleteUser)
    app.put("/users/:id", UserController.editUser)
}