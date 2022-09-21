
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
        if(!isVAlidRequestBody(requestbody)){
            return res.status(400).send({status: false, msg: "please input Book Details"})
        }

        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt , isDeleted} = requestbody

           
        let IsbnNumber = /^[7-9][0-9]+$/.test(ISBN)
        if (IsbnNumber == false) {
            return res.status(400).send({ status: false, msg: 'please enter a valid ISBN Number' })
        }
         
        if (ISBN.length < 13 || ISBN.length > 13) {
            return res.status(400).send({ status: false, msg: "IsbnNumber should be 13 digit" })
        }

        if (isDeleted) {
            if (isDeleted != "false") {
                return res.status(400).send({ status: false, msg: "isDeleted is only take boolean value false" })
            }
        }


        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: ' title is required' })
        }

        let checkTitle = await bookModel.findOne({title:title})
        if(checkTitle) {
        return res.send({status: false, msg: "title must be unique"})
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: ' excerpt is required' })
        }

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, msg: ' userId is required' })
        }
        let findUserId = await userModel.findById(userId)
        if(!findUserId) {
        return res.send({status: false, msg: "user Id is not valid"})
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: ' ISBN is required' })
        }

        let checkISBN = await bookModel.findOne({ISBN:ISBN})
        if(checkISBN) {
        return res.send({status: false, msg: "ISBN must be unique"})
        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: ' category is required' })
        }

        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: ' subcategory is required' })
        }

        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, msg: ' releasedAt is required' })
        }

       // let createBookData = await bookModel.create(requestbody)
        return res.status(201).send({status: true, msg:"successfully created"})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//--------------------------|| GET BOOKS ||--------------------------------

const getBooks = async function(req,res){
    try {
        let requestBody = req.query
        let {userId, category, subcategory} = requestBody

        let getBooksDetails = await bookModel.find({isDeleted: false, ...requestBody}).select({title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews:1})
                       
        if(getBooksDetails.length == 0){
            return res.status(404).send({status: false, msg: 'no book found'})
        } else {
            return res.status(200).send({status: true, msg:"get data successfully", data :getBooksDetails})
        }
         

    } catch (error) {
        return res.status(500).send({status:false, msg:error.message})
    }
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