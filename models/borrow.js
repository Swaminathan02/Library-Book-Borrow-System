const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
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
    }
}, { timestamps: true });

module.exports = mongoose.model("Borrow", borrowSchema);