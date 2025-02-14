require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = ["https://student-dashboard-frontend-dif6.onrender.com"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


// Routes
app.use("/students", studentRoutes);

// Connect to DB and Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));