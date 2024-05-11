const Products = require("../Model/productmodel");
const Cart = require("../Model/cartmodel");

exports.addItemToCart = async (req, res) => {
  const { productId, quantity, product_name, product_price,product_img } =req.body;
  const userId = "65f5509b7b2fe4ab8d24d60f"; //TODO: the logged in user id
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({
          productId,  
          quantity,
          product_name,
          product_price,
          product_img
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [
          { productId, quantity, product_name, product_price, product_img },
        ],
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getAllCart = async (req, res) => {
  try {
    var show_cart = await Cart.find(req.body);
    res.status(200).json({
      status: "success",
      show_cart,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = "65f5509b7b2fe4ab8d24d60f"; // TODO: Get user ID from authenticated user

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedProducts = cart.products.filter(
      (product) => product.productId !== productId
    );

    cart.products = updatedProducts;
    cart = await cart.save();

    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};