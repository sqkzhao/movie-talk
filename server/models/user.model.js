const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');

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

    },
    favorites: [{ id: String, name: String }],
    watchlist: [{ id: String, name: String }],
    friendlist: [{ id: String, name: String}],
    reviews: [{ id: String, review: String }]
    // validate: {
    //     validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
    //     message: "Please enter a valid email"
    //   }
    

}, {timestamps:true})


// UserSchema.virtual('confirmPassword')
//   .get( () => this._confirmPassword )
//   .set( value => this._confirmPassword = value );

// UserSchema.pre('validate', function(next) {
//     if (this.password !== this.confirmPassword) {
//       this.invalidate('confirmPassword', 'Password must match confirm password');
//     }
//     next();
// });



 
// UserSchema.pre('save', function(next) {
//   bcrypt.hash(this.password, 10)
//     .then(hash => {
//       this.password = hash;
//       next();
// });


// const bcrypt = require('bcrypt');

// UserSchema.pre('save', function(next) {
//   bcrypt.hash(this.password, 10)
//     .then(hash => {
//       this.password = hash;
//       next();
//     });
// });



// module.exports.User = mongoose.model("User", UserSchema)



const User = mongoose.model("User", UserSchema)
module.exports.User = User
