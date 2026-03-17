const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Member = require("../models/member");
const Borrow = require("../models/borrow");

// borrow book
router.post("/", async (req, res) => {
    try {
        const { memberId, bookId } = req.body;
        // check member
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        // check book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        // check availability
        if (book.availableCopies <= 0) {
            return res.json({ message: "Book not available" });
        }
        // count borrowed books
        const borrowedCount = await Borrow.countDocuments({
            member: memberId,
            returnDate: null
        });
        if (borrowedCount >= member.borrowLimit) {
            return res.json({
                message: "Borrow limit reached"
            });
        }
        // due date = 7 days
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        const borrow = new Borrow({
            member: memberId,
            book: bookId,
            dueDate
        });
        await borrow.save();

        // reduce available copies
        book.availableCopies -= 1;
        await book.save();
        res.json(borrow);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;