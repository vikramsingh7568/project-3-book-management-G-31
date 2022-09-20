const jwt = require('jsonwebtoken');


//AUTHENTICATION

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



module.exports = { authentication}