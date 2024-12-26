var User_Register = require("../Model/usermodel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.User_Register = async (req, res) => {
  try {
    const newUser = {
      userId: uuidv4(),
      fname: req.body.fname,
      lname: req.body.lname,
      mobileno: req.body.mobileno,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user",
      isVerified: req.body.isVerified || false,
    };

    var data = await User_Register.create(newUser);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error });
  }
};

exports.show_All_User = async (req, res) => {
  var data1 = await User_Register.find(req.body);
  res.status(200).json({
    status: "all Product Is Here",
    data1,
  });
};

exports.Find_Single_user_by_id = async (req, res) => {
  try {
    const userId = req.params.id; // This should be the UUID (not the MongoDB _id)
    const data1 = await User_Register.findOne({ userId }); // Query by userId (UUID)

    if (!data1) {
      return res.status(404).json({
        status: "User not found",
      });
    }

    res.status(200).json({
      status: "User found",
      data: data1,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


exports.Search_user = async (req, res) => {
  let Result = await User_Register.find({
    $or: [
      { fname: { $regex: req.params.id } },
      { lname: { $regex: req.params.id } },
      { lname: { $regex: req.params.id } },
    ],
  });
  res.status(200).json({
    status: "data filtered successfully",
    Result,
  });
};

exports.Delete_User = async (req, res) => {
  var id = req.params.id;
  var delete_data = await User_Register.findByIdAndDelete(id);

  res.status(200).json({
    status: "data deleted successfully...",
    delete_data,
    id,
  });
};

exports.Update_user = async (req, res) => {
  var id = req.params.id;
  var update_data = await User_Register.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "Data updated successfully",
    update_data,
  });
};

exports.User_Login = async (req, res) => {
  try {
    // Check if user with provided email exists
    const user = await User_Register.findOne({ email: req.body.email });

    if (user) {
      if (user.password === req.body.password) {
        const token = jwt.sign({ id: user.id, username: user.email }, "Jenil", {
          expiresIn: "1h",
        });
        console.log("Login successful");
        return res.status(200).json({
          status: "User logged in successfully",
          user,
          token,
        });
      } else {
        console.log("Password incorrect");
        return res.status(200).json({
          status: "Incorrect password",
        });
      }
    } else {
      console.log("User not found");
      return res.status(200).json({
        status: "User not found. Please check your email and password",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
