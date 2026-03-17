const Counter = require("../models/counter");

const getNextId = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      returnDocument: "after",
    },
  );
  return counter.seq;
};

module.exports = getNextId;
