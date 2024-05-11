// controllers/CategoryController.js
const Category = require("../Model/categorymodel");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "Categories retrieved successfully",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to retrieve categories",
      error: err.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "Category added successfully",
      category,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to add category",
      error: err.message,
    });
  }
};


exports.DeleteCategory = async (req,res)=>{
  try {
    var id = req.params.id;
    const Deleted_category = await Category.findByIdAndDelete(id)
    res.status(200).json({
      status: "delete category",
      Deleted_category
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: err.message,
    });
  }
}

exports.Update_Category = async (req, res) => {
  var id = req.params.id;
  var update_data = await Category.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "Category updated successfully",
    update_data,
  });
};
