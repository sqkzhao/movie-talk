const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name must be provided"],
        minlength: [3, "First name must be at least 3 characters"]
    },
    lastName:{
        type: String,
        required: [true, "Last name must be provided"],
        minlength: [3, "Last name must be at least 3 characters"]
    },
    email:{
        type: String,
        required: [true, "Email must be provided"],
        minlength: [3, "Email must be at least 3 characters"]
    },
    password:{
        type: String,
        required: [true, "Password must be provided"],
        minlength: [3, "Password must be at least 3 characters"]
    }
}, {timestamps:true})


const User = mongoose.model("User", UserSchema)
module.exports.User = User
