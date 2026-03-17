const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
require("dotenv").config();

const connectDB = require("./config/db")
const bookRoutes = require("./routes/bookRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Library API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});