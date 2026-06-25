require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const insightRoutes = require("./routes/insights");
const reportRoutes = require("./routes/report");
const streakRoutes = require("./routes/streak");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/mood", require("./routes/mood"));
app.use("/api/insights", insightRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/streak", streakRoutes);

app.get("/", (req, res) => res.json({ message: "MoodBoard AI API running 🧠" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));