const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    borrowLimit: {
        type: Number,
        default: 3
    }
}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);