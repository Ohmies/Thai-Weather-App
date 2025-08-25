const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/weather", weatherRoutes);

// Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌤️  Weather App เริ่มทำงานที่ http://localhost:${PORT}`);
  console.log(`📊 API Endpoint: http://localhost:${PORT}/api/weather`);
});
