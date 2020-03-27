<<<<<<< HEAD

const UserController = require("../controllers/user.controller")

module.exports = app => {
    app.get("/users", UserController.getAllUser)
    app.post("/users", UserController.createUser)
    app.get("/users/:id", UserController.getOneUser)
    app.delete("/users/:id", UserController.deleteUser)
    app.put("/users/:id", UserController.editUser)
=======
// const UserController = require("../controllers/user.controller")

module.exports = function(app) {
    // app.get("/users", UserController.getAllUser)
    // app.post("/users", UserController.createUser)
    // app.get("/users/:id", UserController.getOneUser)
    // app.delete("/users/:id", UserController.deleteUser)
    // app.put("/users/:id", UserController.editUser)
>>>>>>> 4725fda76dd1876f0f53cf3db12d07649b844455
}