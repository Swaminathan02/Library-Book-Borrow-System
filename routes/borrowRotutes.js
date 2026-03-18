const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Member = require("../models/member");
const Borrow = require("../models/borrow");

const getNextId = require("../config/getNextId");

// Post Borrow Book
router.post("/", async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // check member
    const member = await Member.findOne({ memberId });
    if (!member) {
      return res.json({ message: "Member not found" });
    }
    // check book
    const book = await Book.findOne({ bookId });
    if (!book) {
      return res.json({ message: "Book not found" });
    }
    // check availability
    if (book.availableCopies <= 0) {
      return res.json({ message: "Book not available" });
    }
    // count active borrows
    const borrowedCount = await Borrow.countDocuments({
      memberId: member.memberId,
      returnDate: null,
    });
    if (borrowedCount >= member.borrowLimit) {
      return res.json({ message: "Borrow limit reached" });
    }
    const dueDate = new Date(); // due date
    dueDate.setDate(dueDate.getDate() + 7);

    const id = await getNextId("borrow");
    const borrow = new Borrow({
      borrowId: id,
      memberId: member.memberId,
      bookId: book.bookId,
      dueDate,
    });

    await borrow.save();
    book.availableCopies -= 1;
    await book.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Post Return Book
router.post("/return", async (req, res) => {
  try {
    const { memberId, bookId } = req.body;
    const member = await Member.findOne({ memberId });
    const book = await Book.findOne({ bookId });
    if (!member || !book) {
      return res.json({ message: "Member or book not found" });
    }

    const borrow = await Borrow.findOne({
      memberId: member.memberId,
      bookId: book.bookId,
      returnDate: null,
    });

    if (!borrow) {
      return res.json({
        message: "No active borrow found",
      });
    }

    const today = new Date();
    borrow.returnDate = today;
    // fine
    if (today > borrow.dueDate) {
      const diffTime = today.getTime() - borrow.dueDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const finePerDay = 10;
      borrow.fine = diffDays * finePerDay;
    }
    await borrow.save();

    book.availableCopies += 1;
    await book.save();
    res.json(borrow);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get All Borrow Records
router.get("/", async (req, res) => {
  try {
    const borrows = await Borrow.find();
    res.json(borrows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get Active Borrows
router.get("/active", async (req, res) => {
  try {
    const borrows = await Borrow.find({
      returnDate: null,
    });
    res.json(borrows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
