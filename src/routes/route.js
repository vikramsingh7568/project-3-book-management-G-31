const express = require('express');
const router = express.Router();



// ---------------------------|| CONTROLLERS ||--------------------------------

const bookController = require("../controllers/bookController.js")        // BOOK CONTROLLER
const reviewController = require("../controllers/reviewController.js")    // REVIEW CONTROLLER
const userController = require("../controllers/userController.js")        // USER CONTROLLER

//----------------------------|| MIDDLEWARE ||-------------------------

const middleware = require("../middleware/middleware.js")

// ---------------------------|| USER ||--------------------------------

router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)

// ---------------------------|| BOOK ||--------------------------------

router.post("/books", middleware.authentication, middleware.bookAuthorization, bookController.createBooks)
router.get("/books", middleware.authentication, bookController.getBooks)
router.get("/books/:bookId", middleware.authentication, bookController.getBookById)
router.put("/books/:bookId", middleware.authentication, middleware.Authorisation, bookController.updateBook)
router.delete("/books/:bookId", middleware.authentication, middleware.Authorisation, bookController.deleteBook)

// ----------------------------|| REVIEW ||--------------------------------

router.post("/books/:bookId/review", reviewController.createReview)
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

// ----------------------------|| ROUTER VALIDATION ||--------------------------------
  
router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})


module.exports = router;