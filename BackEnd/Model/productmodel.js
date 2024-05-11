  var mongoose = require("mongoose");

  var userSchema = mongoose.Schema({
    product_name: { type: String },
    product_price: { type: String },
    product_img: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  });

  module.exports = mongoose.model("Product_details", userSchema);
