const express = require("express");
const router = express.Router();

const Member = require("../models/member.js");

// create member
router.post("/", async (req, res) => {
    try {
        const { name, email, borrowLimit } = req.body;

        const member = new Member({
            name,
            email,
            borrowLimit
        });

        await member.save();

        res.json(member);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get all members
router.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;