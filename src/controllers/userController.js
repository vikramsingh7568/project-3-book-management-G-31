const userModel = require("../models/userModel.js")



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}


//--------------------------|| CREATE USERS ||--------------------------------

const createUser = async function(req,res){
    try {
        const mobileRegex = /^[6-9][0-9]+$/
        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        const nameRegex = /^[a-z\s]+$/i
        let data = req.body

        if(!isVAlidRequestBody(data)){
            return res.status(400).send({status: false, msg: "please input user Details"})
          }

        const { title, name, phone, email,password  } = data

        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: ' title is required' })
        }

        if(title == "Mr" ||title == "Mrs" ||title == "Miss"){
          
          
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: ' name is required' })
        }

        if(!data.name.match(nameRegex)) {
            return res.status(400).send({status : false, msg : "Invalid format of name"})
        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, msg: ' phone no. is required' })
        }

        if(!data.phone.match(mobileRegex)) {
            return res.status(400).send({status : false, msg :"phone number must be start from 6,7,8,9"})
        }

        if(phone.length < 10 || phone.length > 10){
            return res.status(400).send({status : false, msg : "length of phone no. should be 10 digits"})
        }

        const isMobileAlreadyUsed = await userModel.findOne({phone})
        if(isMobileAlreadyUsed){
          return res.status(400).send({status: false, msg: "phone no already registered"})
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: ' email is required' })
        }

        if(!data.email.match(emailRegex)) {
            return res.status(400).send({status : false, msg : "Invalid format of email"})
        }

        const isEmailAlreadyUsed = await userModel.findOne({email})
        if(isEmailAlreadyUsed){
          return res.status(400).send({status: false, msg: "email already registered"})
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: ' password is required' })
        }

        if(password.length < 8 || password.length > 15){
            return res.status(400).send({ status: false, msg: 'the length of password must be min:- 8 or max: 15' })
        }

        //let userdata=await userModel.create(data)
        return res.status(201).send({status:true, msg: "data succesfully created"})
    } else{
        return res.status(400).send({ status: false, msg: ' title is only contain Mr, Mrs, Miss' })
    }

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