const UserController = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = function(app) {
    app.get('/', UserController.index)
    // REGISTER/LOGIN/LOGOUT
    app.post("/users", UserController.register)
    app.post("/login", UserController.login)
    app.get("/logout", UserController.logout)
    // USERS
    app.get('/users', authenticate, UserController.getAllUsers)
    app.get("/users/:id", UserController.getOneUser)
    app.delete("/users/:id", UserController.deleteUser)
    app.put("/users/:id", UserController.editUser)
}