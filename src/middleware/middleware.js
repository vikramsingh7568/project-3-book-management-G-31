const jwt = require('jsonwebtoken');
const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose')


//--------------------------|| AUTHENTICATION ||--------------------------------

const authentication = async function (req, res, next) {
    try {
        token = req.headers['x-api-key']
        if (!token) { return res.status(400).send({ status: false, message: "Token is missing" }) }
        decodedToken = jwt.verify(token, "Book-Management", (err, decode) => {
            if (err) {
                return res.status(400).send({ status: false, message: "Token is not correct!" })
            }
            req.decode = decode

            next()
        })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------|| AUTHORIZATION ||--------------------------------


const Authorisation = async function (req, res, next) {
    try {
        let book = req.params.bookId
        let isValid = mongoose.Types.ObjectId.isValid(book)

        if (!isValid) {
            return res.status(400).send({ status: false, message: "please enter valid bookId" })
        }

        let CheckingBook = await bookModel.findOne({ _id: book })
        if (!CheckingBook) {
            return res.status(404).send({ status: false, message: "this book is not found" })
        }
        if (CheckingBook.userId != req.decode.userId) {
            return res.status(403).send({ status: false, message: "you are not Authorized person" })
        }
        else {
            next()
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//--------------------------|| AUTHORIZATION FOR CREATE BOOK ||--------------------------------

const bookAuthorization = async function (req, res, next) {
    try {

        let userId = req.body.userId
        let isValid = mongoose.Types.ObjectId.isValid(userId)

        if (!userId) {
            return res.status(400).send({ status: false, msg: ' userId is required' })
        }

        if (!isValid) {
            return res.status(400).send({ status: false, message: "please enter valid userId" })
        }

        let CheckingUserId = await userModel.findOne({ _id: userId })
        if (!CheckingUserId) {
            return res.status(404).send({ status: false, message: "this userId is not found" })
        }


        if (userId != req.decode.userId) {
            return res.status(403).send({ status: false, message: "you are not Authorized person" })

        }
        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}



module.exports = { authentication, Authorisation, bookAuthorization }