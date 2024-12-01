var express = require("express");
var router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const path = require("path");
const upload = require("../cloudinaryConfig"); // Adjust the path accordingly

var {
  User_Register,
  show_All_User,
  Delete_User,
  User_Login,
  Update_user,
  Search_user,
} = require("../controller/usercontroller");
// var {Admin_Register,show_admin,Admin_Login} = require('../controller/admincontroller');
var {
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
var {
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
} = require("../controller/orderplacecontroller");
const categoryController = require("../controller/categorycontroller");
const {
  addItemToCart,
  getAllCart,
  removeItemFromCart,
} = require("../controller/cartcontroller");
// const  authenticateUser  = require('../middleware/authenticate');
// const { Email_Add } = require('../controller/maincontroller');

// router.post('/image',upload.single('image'),Image_upload);
router.post("/register", User_Register);
router.post("/login", User_Login);
router.get("/show_all_user", show_All_User);
router.get("/", (req, res) => {
  const data = "Database is connected...";
  res.status(200).json({
    status: "connected",
    data,
  });
});

// router.get('/Logout',Logout);
router.post("/delete_user", Delete_User);

router.post("/Order_Register", Register_Order_Details);
router.get("/Order_details", Show_all_Order_details);
router.delete("/Order_delete/:id", Order_Delete);
router.get("/Order_Search/:key", Order_Search);
router.post("/product_add", upload.array("images", 5), Product_add);
// router.post("/Product_add", upload.single("image"), Product_add);
router.get("/Product_Show", Product_Show);
router.get("/Product_show/ProductId/:id", one_Product_show);
router.get("/product_Search/:key", product_Search);
router.get("/Product_show/ProductName/:product_name", oneProductByName);
router.get("/Product_show/category/:category", productFindByCat);
router.get("/Product_show/Product_Price/low_to_high", Low_to_High);
router.get("/Product_show/Product_Price/high_to_low", High_to_Low);
router.post("/Product_Update/:id", Product_Update);
router.delete("/product_delete/:id", product_delete);

// router.post("/cart/add/productId", addToCart);
router.post("/addItemToCart", addItemToCart);
router.get("/getAllCart", getAllCart);
router.delete("/removeCartProduct/:cartId/:productId", removeItemFromCart);

// router.get('/Product_show/:product_name',oneProductByName);

router.post("/Inquiry_add", Inquiry_add);
router.get("/Inquiry_show", Inquiry_show);
router.delete("/Inquiry_delete/:id", Inquiry_delete);
router.get("/Inquiry_Search/:key", Inquiry_Search);

router.get("/categories", categoryController.getAllCategories);
router.post("/addCategory", categoryController.addCategory);
router.delete("/CateDelete/:id", categoryController.DeleteCategory);
router.post("/CateUpdate/:id", categoryController.Update_Category);

router.get("/Search/:id", Search_user);
router.delete("/delete_user/:id", Delete_User);
router.post("/Update_user/:id", Update_user);

module.exports = router;
