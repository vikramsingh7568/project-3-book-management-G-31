const userModel = require("../models/userModel.js")


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

}

//--------------------------|| EXPORTING MODULE TO ROUTE.JS ||--------------------------------

module.exports.createUser = createUser
module.exports.loginUser = loginUser