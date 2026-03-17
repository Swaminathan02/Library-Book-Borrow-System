const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
require("dotenv").config();

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowRoutes = require("./routes/borrowRotutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/borrows", borrowRoutes);

app.get("/", (req, res) => {
  res.send("Library API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server running"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});
