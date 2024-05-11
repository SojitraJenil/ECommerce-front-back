
// var user = require('../Model/adminmodel')

        
// exports.Admin_Register = async (req,res) =>{
       
//             var data = await user.create(req.body);

//             res.status(200).json({
//                 status:"success",
//                 data
//             })
    
// }


// exports.Admin_Login = async (req,res) =>{

//     try {
//         var check_data =  await user.find({"email":req.body.email})
//         if(check_data!=0)
//         {
    
//             if(check_data[0].password==req.body.password)
//             {
//                 var okk =10;
//                 console.log("success");
//                 res.status(200).json({
//                     status:"Admin Login successfully"
//                 })
//             }
//             else
//             {
//                 console.log("Unsuccess");
//                 res.status(200).json({
//                     status:"check only Admin password"
//                 })
//             }
//         }
//         else
//         {
//             console.log("No Record found");
//             res.status(200).json({
//                 status:"please enter correct gmail and password"
//             })
//         }
    
//     } catch (error) {
//         res.status(200).json({
//             error
//         })
//     }
    
//     }
    

// exports.show_admin = async(req,res)=>{

//     var data1 = await user.find(req.body)
//     res.status(200).json({
//         status:"all admin Is Here",
//         data1
//     })
// }

