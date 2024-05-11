var inquiry  = require("../Model/inquirymodel");

exports.Inquiry_add = async (req, res) => {
    var product = await inquiry.create(req.body);
    res.status(200).json({
      status: "inquiry added Successfully",
      product,
    });
  };

exports.Inquiry_show = async(req,res)=>{
    var inquiry_show = await inquiry.find(req.body);
    res.status(200).json({
        status: "inquiry inquiry_show Successfully",
        inquiry_show,
      });
}

exports.Inquiry_delete = async (req, res) => {
  var id = req.params.id;
  var Delete_Inq = await inquiry.findByIdAndDelete(id);
  res.status(200).json({
    status: "inquiry delete Successfully",
    Delete_Inq
  })
}

exports.Inquiry_Search = async (req, res) => { 
  let Result= await inquiry.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {email:{$regex:req.params.key}},
      {mobile:{$regex:req.params.key}},
      {subject:{$regex:req.params.key}},
      {message:{$regex:req.params.key}}
    ]
  })
  res.status(200).json({
    status:"Inquiry_Search",
    Result
  }) 
}; 