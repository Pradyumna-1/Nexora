const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Database Connection
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server is running on PORT 5000 "));
