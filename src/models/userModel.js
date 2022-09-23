const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   title:{
    type: String,
    require: true,
    enum: ["Mr","Mrs","Miss"],
    trim: true
   },
   name:{
    type: String,
    require: true,
    trim: true
   },
   phone:{
    type: String,
    require: true,
    unquie: true,
    trim: true
   },
   email:{
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
   },
   password:{
    type: String,
    require: true,
    minlength: 8,
    maxlength: 15,
    trim: true
   },
   address:{
    street: {
        type: String,
        trim: true
    },
    city: {
      type: String,
      trim: true
    },
    pincode: {
       type: String,
       trim: true
    },
    
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