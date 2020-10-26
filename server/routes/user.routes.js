const UserController = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = function(app) {
    app.get('/api', UserController.index)
    // REGISTER/LOGIN/LOGOUT
    app.post("/api/users", UserController.register)
    app.post("/api/login", UserController.login)
    app.get("/api/logout", UserController.logout)
    // USERS
    app.get('/api/users', authenticate, UserController.getAllUsers)
    app.get("/api/users/:id", UserController.getOneUser)
    app.delete("/api/users/:id", UserController.deleteUser)
    app.put("/api/users/:id", UserController.editUser)
}