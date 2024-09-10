var Product = require("../Model/productmodel");
const Category = require("../Model/categorymodel"); // Import the Category model
const cloudinary = require("../cloudinaryConfig"); // Import Cloudinary configuration

exports.Product_add = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const {
      product_name,
      product_price,
      product_description,
      category,
      Product_stock,
      Product_dis_rate,
      Product_rating,
    } = req.body;

    // Extract URLs from uploaded files
    const imageUrls = req.files.map((file) => file.path); // Multer/Cloudinary provides the file path

    // Create product object with Cloudinary image URLs
    const productData = {
      product_name,
      product_price,
      product_description,
      category,
      product_img: imageUrls, // Array of Cloudinary image URLs
      Product_stock,
      Product_dis_rate,
      Product_rating,
    };

    // Save product to MongoDB
    const product = await Product.create(productData);
    res.status(200).json({
      status: "Product added successfully with images",
      product,
    });
  } catch (error) {
    console.error("Error adding product with images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// var limit=5;
// var total_record= await user.find().count();

// var page_no= req.query.page_no;

// if(page_no==undefined)
// {
//     page_no=1;
// }

// var skip = (page_no-1)*limit;

// var data = await user.find().limit(limit).skip(skip);

// var page = Math.ceil(total_record/limit);

// res.status(200).json({
//     status:"successfull",
//     data,
//
// })
// }
//`${RenderHost}/Product_Show?page_no=1
exports.Product_Show = async (req, res) => {
  var limit = 80;
  var total_record = await Product.find().count();
  var page_no = req.query.page_no;

  if (page_no == undefined) {
    page_no = 1;
  }
  var skip = (page_no - 1) * limit;
  var page = Math.ceil(total_record / limit);
  var product_show = await Product.find(req.body)
    .populate("category")
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: "product show Successfully",
    product_show,
    total_record,
    page,
    page_no,
  });
};

exports.productFindByCat = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Find products by category ObjectId in your database
    const One_product_show = await Product.find({
      category: category._id,
    }).populate("category");
    if (One_product_show.length > 0) {
      res.status(200).json({
        status: "one product show Successfully",
        One_product_show,
      });
    } else {
      res.status(404).json({ message: "No products found in this category" });
    }
  } catch (error) {
    console.error("Error finding products by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.one_Product_show = async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the parameter is named product_id
    console.log(productId);
    // Find product by ID and populate the associated category
    const product = await Product.findById(productId).populate("category");

    if (product) {
      res.status(200).json({
        status: "Product found successfully",
        product,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.oneProductByName = async (req, res) => {
  try {
    const partialProductName = req.params.product_name; // Extract partial product_name from request parameters
    console.log("Product Name:", partialProductName); // Add logging for debugging

    // Construct a regular expression to match partially provided product name
    const regex = new RegExp(partialProductName, "i"); // "i" flag for case-insensitive search

    // Find products with names that match the partial name and populate the associated category
    const products = await Product.find({ product_name: regex }).populate(
      "category"
    );

    if (products && products.length > 0) {
      // If products found, send success response with product details
      res.status(200).json({
        status: "Success",
        products,
      });
    } else {
      // If products not found, send 404 Not Found response
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    // If an error occurs, log it and send 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.product_delete = async (req, res) => {
  var id = req.params.id;
  let delete_product = await Product.findByIdAndDelete(id);
  res.status(200).json({
    status: "product deleted Successfully",
    delete_product,
  });
};

exports.High_to_Low = async (req, res) => {
  try {
    const products = await Product.find(req.body).sort({ product_price: -1 });
    res.status(200).json({
      status: "Success",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Low_to_High = async (req, res) => {
  try {
    const products = await Product.find(req.body).sort({ product_price: 1 });
    res.status(200).json({
      status: "Success",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.product_Search = async (req, res) => {
  try {
    const key = req.params.key; // Extract the search key from request parameters
    console.log("Search Key:", key); // Add logging for debugging

    // Construct a regular expression to match partially provided search key
    const regex = new RegExp(key, "i"); // "i" flag for case-insensitive search

    // Find products that match partially provided search key in category, product_name, or product_price
    const result = await Product.find({
      $or: [
        { category: regex },
        { product_name: regex },
        { product_price: regex },
      ],
    });

    res.status(200).json({
      status: "Data filtered successfully",
      result,
    });
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.Product_Update = async (req, res) => {
//     var id = req.params.id;
//     var update_data = await Product.findByIdAndUpdate(id, req.body);
//     res.status(200).json({
//       status: "Data updated successfully",
//       update_data,
//     });
//   };

exports.Product_Update = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if an image is uploaded
    if (!req.file) {
      const updateDataWithoutImage = req.body;

      // Find product by ID and update without changing the image
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateDataWithoutImage,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({
        status: "Product updated successfully without image",
        updatedProduct,
      });
    }

    const updateDataWithImage = {
      ...req.body,
      product_img: req.file.originalname, // Assuming the image filename is stored in req.file.originalname
    };

    // Find product by ID and update with new data including the image
    const updatedProductWithImage = await Product.findByIdAndUpdate(
      id,
      updateDataWithImage,
      { new: true }
    );

    if (!updatedProductWithImage) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      status: "Product updated successfully with image",
      updatedProductWithImage,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
