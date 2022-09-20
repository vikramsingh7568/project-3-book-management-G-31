
const bookModel = require("../models/bookModel.js")
const userModel = require("../models/userModel.js")


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function(requestBody){
    return Object.keys(requestBody).length > 0
}

//--------------------------|| CREATE BOOKS ||--------------------------------

const createBooks = async function(req,res){
    try {
        let requestbody = req.body
        if(!requestbody.userId){
            return res.status(400).send({status:false, msg:"userId is required"})
        }
        let findUserId = await userModel.findById(requestbody.userId)
        if(!findUserId) {
        return res.send({status: false, msg: "user Id is not valid"})
    }

        let createBookData = await bookModel.create(requestbody)
        return res.status(201).send({status: true, msg:"successfully created", createBookData})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//--------------------------|| GET BOOKS ||--------------------------------

const getBooks = async function(req,res){
    
}

//--------------------------|| GET BOOKS BY PARAMS ||--------------------------------

const getBookByparam = async function(req,res){
    
}

//--------------------------|| UPDATE BOOKS ||--------------------------------

const updateBook = async function(req,res){
    
}

//--------------------------|| DELETE BOOKS ||--------------------------------

const deleteBook = async function(req,res){
    
}

//--------------------------|| EXPORTING MODULE TO ROUTE.JS ||--------------------------------

module.exports.createBooks = createBooks
module.exports.getBooks = getBooks
module.exports.getBookByparam  = getBookByparam 
module.exports.updateBook = updateBook
module.exports.deleteBook = deleteBook




// Create a book document from request body. Get userId in request body only.
// Make sure the userId is a valid userId by checking the user exist in the users collection.
// Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like this
// Create atleast 10 books for each user
// Return HTTP status 400 for an invalid request with a response body like this