const express = require("express");   
const cors = require("cors");       
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");
const authroutes = require("./routes/authroutes.js");
const taskroutes = require("./routes/taskroutes.js");

// Load env variables
dotenv.config();

// Connect DB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Routes
app.use("/api/auth", authroutes);
app.use("/api/task", taskroutes);

// Default route (optional but helpful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});