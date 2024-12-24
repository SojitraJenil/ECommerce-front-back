const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  country: { type: String },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product_details', required: true },
      productName: { type: String, required: true },
      productPrice: { type: Number, required: true },
      productDescription: { type: String },
      category: { type: String },
      productImg: { type: String },
      quantity: { type: Number, required: true }
    }
  ],
  voucher: { type: String },
  fname: { type: String },
  lname: { type: String },
  company: { type: String },
  address: { type: String },
  pinCode: { type: String },
  email: { type: String },
  phone: { type: String },
  modifiedOn: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model("Order_Details", userSchema);
