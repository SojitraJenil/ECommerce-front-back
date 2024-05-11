var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fname:{type:String},    
    lname:{type:String},    
    email:{type:String},
    password:{type:String}
})

module.exports = mongoose.model("registers",userSchema);