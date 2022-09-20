const userModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')

//--------------------------|| CREATE USERS ||--------------------------------

const createUser = async function(req,res){
    try {
        let data=req.body
        let userdata=await userModel.create(data)
        return res.status(201).send({status:true, msg: "data succesfully created",data:userdata})

    } catch (error) {
        return res.status(500).send({status:false, msg:"error", error:error.message})  
    }

}

//--------------------------|| LOGIN USERS ||--------------------------------

const loginUser = async function(req,res){
    try{

     let {email , password} = req.body

     if (!email) {
        return res.status(400).send({
             status: false, message: "EmailId is mandatory"
        })
   }

   // Password is mandatory

   if (!password) {
        return res.status(400).send({
             status: false, message: "Password is mandatory"
        })
   }

     
     let DataChecking = await userModel.findOne({email :email, password:password})
     if(DataChecking.length==0){
        return res.status(404).send({msg : "Please enter valid email or password"})
     }
     
     let token = jwt.sign(
        {
             userId: DataChecking._id.toString(),
             batch: "Plutonium",
             organisation: "Project-3, Group-31"
        },
        "Book-Management",{

          expiresIn: '1M' // expires in 1m hours

           });
   return res.status(201).send({ status: true, message: token })
}
catch (error) {
   res.status(500).send({
        status: false, message: error.message
   })
}

}

//--------------------------|| EXPORTING MODULE TO ROUTE.JS ||--------------------------------

module.exports.createUser = createUser
module.exports.loginUser = loginUser