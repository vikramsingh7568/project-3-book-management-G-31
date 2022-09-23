const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const reviewSchema = new mongoose.Schema({
  bookId: {
    type: ObjectId,
    required: true,
    ref: "book",
    trim: true
  },
  reviewedBy: {
    type: String,
    required: true,
    default: 'Guest',
    value: "reviewer's name",
    trim: true
  },
  reviewedAt: {
    type: Date,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    trim: true
  },
  reviews: {
    type: String,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
    trim: true
  },

}, { timestamps: true });


module.exports = mongoose.model('review', reviewSchema)


