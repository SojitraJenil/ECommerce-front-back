var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  product_name: { type: String },
  product_price: { type: String },
  product_description: { type: String },
  product_img: { type: Array },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  Product_stock: { type: String },
  Product_dis_rate: { type: String },
  Product_rating: { type: String },
});

module.exports = mongoose.model("Product_details", userSchema);
