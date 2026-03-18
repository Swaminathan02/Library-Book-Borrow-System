const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    borrowId: {
      type: Number,
    },
    memberId: {
      type: Number,
      required: true,
    },
    bookId: {
      type: Number,
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Borrow", borrowSchema);
