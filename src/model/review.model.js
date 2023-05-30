const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    gigId: {
      type: String,
      required: true,
    },

    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
