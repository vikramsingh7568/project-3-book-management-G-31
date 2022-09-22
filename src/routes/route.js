const express = require('express');
const router = express.Router();

// ---------------------------|| CONTROLLERS ||--------------------------------

const bookController= require("../controllers/bookController.js")        // BOOK CONTROLLER
 const reviewController=require("../controllers/reviewController.js")    // REVIEW CONTROLLER
 const userController=require("../controllers/userController.js")        // USER CONTROLLER

//----------------------------|| middleware ||-------------------------

   const middleware = require("../middleware/middleware.js")

// ---------------------------|| USER ||--------------------------------

 router.post("/register",userController.createUser)
 router.post("/login",userController.loginUser) 

// ---------------------------|| BOOK ||--------------------------------

router.post("/books",middleware.authentication,bookController.createBooks)   
router.get("/books",middleware.authentication,bookController.getBooks)
router.get("/books/:bookId",middleware.authentication,bookController.getBookByparam )
router.put("/books/:bookId",middleware.authentication,middleware.Authorisation,bookController.updateBook)
router.delete("/books/:bookId",middleware.authentication,middleware.Authorisation,bookController.deleteBook)

// ------------------ ---------|| REVIEW ||--------------------------------

router.post("/books/:bookId/review",middleware.authentication,middleware.Authorisation,reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",middleware.authentication,middleware.Authorisation,reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",middleware.authentication,middleware.Authorisation,reviewController.deleteReview)

// -----------------------------------------------------------------------


router.all("/*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})


module.exports = router;