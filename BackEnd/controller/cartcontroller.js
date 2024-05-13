const Cart = require("../Model/cartmodel");

exports.addItemToCart = async (req, res) => {
  const { productId, quantity, product_name, product_price, product_img } =
    req.body;
  const userId = "65f5509b7b2fe4ab8d24d60f"; // Assuming you have middleware to authenticate and attach user object to request

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity; // Increment quantity
        cart.products[itemIndex] = productItem;
      } else {
        // Product does not exist in cart, add new item
        cart.products.push({
          productId,
          quantity,
          product_name,
          product_price,
          product_img,
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // No cart for user, create new cart
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
  try {
    const { cartId, productId } = req.params;

    // Find the cart document by its ID
    const cart = await Cart.findById(cartId);

    // Check if the cart exists
    if (!cart) {
      return res.status(404).json({
        status: "Error",
        message: "Cart not found",
      });
    }

    // Find the index of the product in the products array
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    console.log(productIndex);

    // Check if the product exists in the cart
    if (productIndex === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found in the cart",
      });
    }

    // Remove the product from the products array
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      status: "Carted product deleted successfully!",
      deleted_product: productId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};
