var Order_Detail = require("../Model/orderplacemodel");
const User_Register = require("../Model/usermodel");
const Cart = require("../Model/cartmodel");
const Product_details = require("../Model/productmodel");
const Joi = require('joi');

exports.Place_Order = async (req, res) => {
  try {
    const user = await User_Register.findOne({ userId: req.body.userId });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const cart = await Cart.findOne({ userId: req.body.userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Cart is empty",
      });
    }

    const cartItems = cart.products.map((item) => {
      if (!item.productId) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      return {
        productId: item.productId._id,
        productName: item.productId.product_name, // Updated field name
        productPrice: item.productId.product_price, // Updated field name
        productDescription: item.productId.product_description || "",
        category: item.productId.category || "",
        productImg: Array.isArray(item.productId.product_img)
          ? item.productId.product_img[0] // Use the first image if it's an array
          : item.productId.product_img, // Directly assign if it's a string
        quantity: item.quantity,
      };
    });


    const totalPrice = cart.products.reduce((total, item) => {
      if (!item.productId || !item.productId.product_price) {
        throw new Error(`Product price not found for ID ${item.productId}`);
      }
      return total + item.productId.product_price * item.quantity; // Updated field name
    }, 0);

    const orderData = {
      userId: req.body.userId,
      country: req.body.country,
      voucher: req.body.voucher,
      fname: req.body.fname,
      lname: req.body.lname,
      company: req.body.company,
      address: req.body.address,
      pinCode: req.body.pinCode,
      email: req.body.email,
      phone: req.body.phone,
      cartItems,
      totalPrice,
    };

    const order = await Order_Detail.create(orderData);

    user.orderHistory.push(order._id);
    await user.save();

    cart.products = [];
    await cart.save();

    res.status(200).json({
      status: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      status: "error",
      error: error.message || error,
    });
  }
};


exports.Get_User_Orders = async (req, res) => {
  try {
    console.log("Received userId:", req.params.userId); // Debugging log
    const user = await User_Register.findOne({ userId: req.params.userId }).populate("orderHistory");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      orders: user.orderHistory,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      status: "error",
      error,
    });
  }
};

exports.Register_Order_Details = async (req, res) => {
  try {
    var Order_Details = await Order_Detail.create(req.body);
    res.status(200).json({
      status: "success",
      Order_Details,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Show_all_Order_details = async (req, res) => {
  try {
    // Fetch all order details and populate the productId field in the cartItems array
    const show_details = await Order_Detail.find(req.body)
      .populate({
        path: 'cartItems.productId', // Populate productId field in the cartItems array
        model: 'Product_details'
      });
    res.status(200).json({
      status: "success",
      show_details, // Returning populated show details
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching order details",
    });
  }
};


exports.Order_Delete = async (req, res) => {
  var id = req.params.id;
  var Order_Delete = await Order_Detail.findByIdAndDelete(id);
  res.status(200).json({
    status: "Order Delete Successfully",
    Order_Delete
  })
}

exports.Order_Search = async (req, res) => {
  let Result = await Order_Detail.find({
    "$or": [
      { fname: { $regex: req.params.key } },
      { lname: { $regex: req.params.key } },
      { country: { $regex: req.params.key } },
      { voucher: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { address: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { phone: { $regex: req.params.key } },
      { pinCode: { $regex: req.params.key } }
    ]
  })
  res.status(200).json({
    status: "Inquiry_Search",
    Result
  })
}; 