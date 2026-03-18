const express = require("express");
const router = express.Router();

const Member = require("../models/member.js");

// create member
router.post("/", async (req, res) => {
  try {
    const { name, email, borrowLimit } = req.body;
    const existing = await Member.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Member with this email already exists" });
    }
    const getNextId = require("../config/getNextId");
    const id = await getNextId("member");
    const member = new Member({
      memberId: id,
      name,
      email,
      borrowLimit,
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
