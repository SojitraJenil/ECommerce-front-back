var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileno: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order_Details" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("registers", userSchema);
