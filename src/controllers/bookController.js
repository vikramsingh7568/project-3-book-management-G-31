
const bookModel = require("../models/bookModel.js")
const userModel = require("../models/userModel.js")
const reviewModel = require("../models/reviewModel")
const moment = require('moment')
const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isVAlidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}



//--------------------------|| CREATE BOOKS ||--------------------------------

const createBooks = async function (req, res) {
    try {
        let requestbody = req.body

        if (!isVAlidRequestBody(requestbody)) {
            return res.status(400).send({ status: false, msg: "please input Book Details" })
        }

        const { title, excerpt, userId, ISBN, category, subcategory, isDeleted, releasedAt } = requestbody
        let releasedat = requestbody.releasedAt
      releasedat = moment(new Date()).format("YYYY" - "MM" - "DD")
     
      if (isNaN(Date.parse(releasedAt))) {
            return res.status(400).send({status : false , msg : "please enter valid date for example = 2022-01-02"})
        }
        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: ' ISBN is required' })
        }

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

        let checkTitle = await bookModel.findOne({ title: title })
        if (checkTitle) {
            return res.send({ status: false, msg: "title must be unique" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: ' excerpt is required' })
        }


        let findUserId = await userModel.findById(userId)
        if (!findUserId) {
            return res.send({ status: false, msg: "user Id is not valid" })
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: ' ISBN is required' })
        }

        let checkISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkISBN) {
            return res.send({ status: false, msg: "ISBN must be unique" })
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

        let createBookData = await bookModel.create(requestbody)
        return res.status(201).send({ status: true, msg: "successfully created", data: createBookData })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//--------------------------|| GET BOOKS ||--------------------------------

const getBooks = async function (req, res) {
    try {

        let requestBody = req.query
        if (requestBody.subcategory === "") {
            return res.status(400).send({ status: false, msg: "please enter a subcategory" })
        }

        if (requestBody.category === "") {
            return res.status(400).send({ status: false, msg: "please enter a category" })
        }
        if (requestBody.userId === "") {
            return res.status(400).send({ status: false, msg: "please enter user id" })
        }

        let getBooksDetails = await bookModel.find({ isDeleted: false, ...requestBody }).sort({title: 1}).collation({locale: "en"}).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

        if (getBooksDetails.length == 0) {
            return res.status(404).send({ status: false, msg: 'no book found' })
        } else {
            return res.status(200).send({ status: true, msg: "get data successfully", data: getBooksDetails })
        }


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
//--------------------------|| GET BOOKS BY PARAMS ||--------------------------------

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!bookId) {
            return res.status(400).send({ status: false, message: "please provide a bookId in params" })

        };
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: `${bookId} is not valid book Id` })
        }

        // let findbookId = await bookModel.findById(bookId)
        let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!bookData) {
            return res.status(404).send({ status: false, msg: "book Id is not valid" })
        }


        let reviewFind = await reviewModel.find({ bookId: bookId, isDeleted:false }).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        console.log(bookData)
        let result = bookData.toJSON()
        // let result = bookData._doc
        result.reviewData = reviewFind


        return res.status(200).send({ status: true, message: 'Books list', data: result })

    } catch (err) {
        return res.status(500).send(err.message)
    }

}

//--------------------------|| UPDATE BOOKS ||--------------------------------

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId;

        if (!bookId) {
            return res.status(400).send({ status: false, message: "please provide a bookId in params" })
        };

        let findbookId = await bookModel.findById(bookId)
        if (!findbookId) {
            return res.status(404).send({ status: false, msg: "bookId doesn't exists" })
        }

        let updatedata = req.body;

        let { title, excerpt, ISBN, releasedAt } = updatedata;
  
       if(releasedAt){
        if (isNaN(Date.parse(releasedAt))) {
            return res.status(400).send({status : false , msg : "please enter valid date for example = 2022-01-02"})
        }
       }



        if (!isVAlidRequestBody(updatedata)) {
            return res.status(400).send({ status: false, msg: "please input Book Details" })
        };

        let checkTitle = await bookModel.findOne({ title: title })
        if (checkTitle) {
            return res.status(400).send({ status: false, msg: "title must be unique" })
        }

        let checkISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkISBN) {
            return res.status(400).send({ status: false, msg: "ISBN must be unique" })
        }

        let availabId = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!availabId) {
            return res.status(404).send({ status: false, msg: "bookId is not present in db" })
        }

        let bookupdate = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false },
            { $set: { title: title, excerpt: excerpt, ISBN: ISBN, releasedAt: releasedAt } },
            { new: true });

        return res.status(200).send({ status: true, message: 'Success', data: bookupdate });


    } catch (error) {
        return res.status(500).send(error.message)
    }

}

//--------------------------|| DELETE BOOKS ||--------------------------------

const deleteBook = async function (req, res) {
    try {
        let bookId = req.params.bookId

        if (!bookId) {
            return res.status(400).send({ status: false, message: "please provide a bookId in params" })
        };

        let findbookId = await bookModel.findById(bookId)
        if (!findbookId) {
            return res.status(404).send({ status: false, msg: "bookId doesn't exists" })
        }

        const checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!checkBookId) {
            return res.status(404).send({ status: false, message: "no book found" })
        }

        let deletedBook = await bookModel.findByIdAndUpdate({ _id: bookId }, { $set: { isDeleted: true } }, { new: true });

        return res.status(200).send({ status: true, message: "book sucessfully deleted", deletedBook });

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//--------------------------|| EXPORTING MODULE TO ROUTE.JS ||--------------------------------

module.exports = { createBooks, getBooks, getBookById, updateBook, deleteBook }


