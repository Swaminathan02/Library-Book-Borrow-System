const express = require("express");
const router = express.Router();

const Book = require("../models/book.js");

// add book
router.post("/", async (req, res) => {
    try {
        const { title, author, totalCopies } = req.body;
        const book = new Book({
            title,
            author,
            totalCopies,
            availableCopies: totalCopies
        });

        await book.save();

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;