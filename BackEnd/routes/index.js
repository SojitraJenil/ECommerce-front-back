const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const upload = require("../cloudinaryConfig"); // Adjust the path accordingly

// Import controllers
const {
  User_Register,
  show_All_User,
  Delete_User,
  User_Login,
  Update_user,
  Search_user,
} = require("../controller/usercontroller");
const {
  Product_add,
  Product_Show,
  product_delete,
  product_Search,
  one_Product_show,
  productFindByCat,
  oneProductByName,
  Product_Update,
  Low_to_High,
  High_to_Low,
} = require("../controller/productcoltroller");
const {
  Inquiry_add,
  Inquiry_show,
  Inquiry_delete,
  Inquiry_Search,
} = require("../controller/inquirycontroller");
const {
  Register_Order_Details,
  Show_all_Order_details,
  Order_Delete,
  Order_Search,
  Get_User_Orders,
  Place_Order,
} = require("../controller/orderplacecontroller");
const {
  addItemToCart,
  getAllCart,
  removeItemFromCart,
  getCart,
} = require("../controller/cartcontroller");
const categoryController = require("../controller/categorycontroller");
const { authenticateUser } = require("../middleware/authenticate");

// Root route
router.get("/", (req, res) => {
  res.status(200).json({
    status: "connected",
    data: "Database is connected...",
  });
});

// User routes
router.post("/register", User_Register);
router.post("/login", User_Login);
router.get("/show_all_user", show_All_User);
router.get("/Search/:id", Search_user);
router.post("/Update_user/:id", Update_user);
router.delete("/delete_user/:id", Delete_User);

// Product routes
router.post("/product_add", upload.array("images", 5), Product_add);
router.get("/Product_Show", Product_Show);
router.get("/Product_show/ProductId/:id", one_Product_show);
router.get("/product_Search/:key", product_Search);
router.get("/Product_show/ProductName/:product_name", oneProductByName);
router.get("/Product_show/category/:category", productFindByCat);
router.get("/Product_show/Product_Price/low_to_high", Low_to_High);
router.get("/Product_show/Product_Price/high_to_low", High_to_Low);
router.post("/Product_Update/:id", Product_Update);
router.delete("/product_delete/:id", product_delete);

// Cart routes

router.post("/addItemToCart", addItemToCart);
router.get("/getAllCart", getAllCart);
router.get("/getCart/:userId", getCart);
router.delete("/removeCartProduct/:cartId/:productId", removeItemFromCart)

// Inquiry routes
router.post("/Inquiry_add", Inquiry_add);
router.get("/Inquiry_show", Inquiry_show);
router.delete("/Inquiry_delete/:id", Inquiry_delete);
router.get("/Inquiry_Search/:key", Inquiry_Search);

// Order routes

router.post("/place-order", Place_Order);
router.get("/user-orders/:userId", Get_User_Orders);
router.post("/Order_Register", Register_Order_Details);
router.get("/Order_details", Show_all_Order_details);
router.delete("/Order_delete/:id", Order_Delete);
router.get("/Order_Search/:key", Order_Search);

// Category routes
router.get("/categories", categoryController.getAllCategories);
router.post("/addCategory", categoryController.addCategory);
router.delete("/CateDelete/:id", categoryController.DeleteCategory);
router.post("/CateUpdate/:id", categoryController.Update_Category);

module.exports = router;
