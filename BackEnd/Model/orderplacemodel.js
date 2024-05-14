var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userId: { type: String },
  country: { type: String },
  voucher: { type: String },
  fname: { type: String },
  lname: { type: String },
  company: { type: String },
  address: { type: String },
  pinCode: { type: String },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("Order_Details", userSchema);
