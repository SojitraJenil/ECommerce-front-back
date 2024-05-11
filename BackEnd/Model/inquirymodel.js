var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    subject:{type:String},
    message:{type:String}
})

module.exports = mongoose.model("inquiry_details",userSchema);