const Cart = require("../Model/cartmodel");
const Product_details = require("../Model/productmodel");

exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Fetch product details
    const product = await Product_details.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Find the existing product in the cart
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        // Update the quantity of the existing product
        existingProduct.quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.products.push({
          productId: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          productDescription: product.productDescription,
          category: product.category,
          productImg: product.productImg,
          productStock: product.productStock,
          productDisRate: product.productDisRate,
          productRating: product.productRating,
          quantity,
        });
      }

      // Save the updated cart
      await cart.save();
    } else {
      // If no cart exists for the user, create a new one
      cart = new Cart({
        userId,
        products: [
          {
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            category: product.category,
            productImg: product.productImg,
            productStock: product.productStock,
            productDisRate: product.productDisRate,
            productRating: product.productRating,
            quantity,
          },
        ],
      });

      // Save the new cart
      await cart.save();
    }

    // Return the updated cart to the user
    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};


exports.getUserCart = async (req, res) => {
  const userId = req.user?.userId; // User ID from middleware
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    return res.status(200).json({ status: "success", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = { id: decoded.id }; // Attach user ID to request
    next();
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};


exports.getAllCart = async (req, res) => {
  try {
    const { userID } = req.params;
    var show_cart = await Cart.find(req.body);
    res.status(200).json({
      status: "success",
      show_cart,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID is required" });
    }
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "products.productId",
        select: "product_name product_price product_description category product_img",
      });

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.error("Error fetching cart by userId:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
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

    // Check if cart.products exists
    if (!cart.products || !Array.isArray(cart.products)) {
      return res.status(404).json({
        status: "Error",
        message: "Products not found in the cart",
      });
    }

    // Find the index of the product in the products array
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

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
      status: "Success",
      message: "Carted product deleted successfully!",
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
