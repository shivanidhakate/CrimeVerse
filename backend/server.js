const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to CrimeVerse API 🚔",
        status: "Backend is running successfully!"
    });
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 CrimeVerse Backend running on http://localhost:${PORT}`);
});