var Order_Detail = require("../Model/orderplacemodel");

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
      var show_details = await Order_Detail.find(req.body);
      res.status(200).json({
        status: "success",
        show_details,
      });
    } catch (error) {
     console.log(error);
    }
   };

   exports.Order_Delete = async (req, res) => {
    var id = req.params.id;
    var Order_Delete = await Order_Detail.findByIdAndDelete(id);
    res.status(200).json({
      status:"Order Delete Successfully",
      Order_Delete
    })
  }
  
  exports.Order_Search = async (req, res) => { 
    let Result= await Order_Detail.find({
      "$or":[
        {fname:{$regex:req.params.key}},
        {lname:{$regex:req.params.key}},
        {country:{$regex:req.params.key}},
        {voucher:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {address:{$regex:req.params.key}},
        {email:{$regex:req.params.key}},
        {phone:{$regex:req.params.key}},
        {pinCode:{$regex:req.params.key}}
      ]
    })
    res.status(200).json({
      status:"Inquiry_Search",
      Result
    }) 
  }; 