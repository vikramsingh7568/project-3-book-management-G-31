const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    }, 
    userId: {
        type: ObjectId, 
        required: true,
        ref: "user",
        trim: true
    },
    ISBN: {
        type: String,
        require: true, 
        unique: true,
        trim: true
    },
    category: {
        type: String, 
        require: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        trim: true
    },
    reviews: {
       type: Number, 
       default: 0,
       trim: true 
    },
    deletedAt: {
        type: Date,
        trim: true
    }, 
    isDeleted: {
        type: Boolean, 
        default: false
    },
    releasedAt: {
        type: Date, 
        required: true
       // format("YYYY-MM-DD"), 
        },
    
}, { timestamps: true });


module.exports = mongoose.model('book', bookSchema)



