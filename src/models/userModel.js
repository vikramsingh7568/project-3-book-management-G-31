const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   title:{
    type: String,
    require: true,
    enum: ["Mr","Mrs","Miss"]
   },
   name:{
    type: String,
    require: true,
   },
   phone:{
    type: String,
    require: true,
    unquie: true
   },
   email:{
    type: String,
    require: true,
    unique: true,
   },
   password:{
    type: String,
    require: true,
    minlength: 8,
    maxlength: 15
   },
   address:{
    street: {
        type: String
    },
    city: {
      type: String
    },
    pincode: {
       type: String
    }
   },
    
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema)



// title: {string, mandatory, enum[Mr, Mrs, Miss]},
// name: {string, mandatory},
// phone: {string, mandatory, unique},
// email: {string, mandatory, valid email, unique}, 
// password: {string, mandatory, minLen 8, maxLen 15},
// address: {
//   street: {string},
//   city: {string},
//   pincode: {string}