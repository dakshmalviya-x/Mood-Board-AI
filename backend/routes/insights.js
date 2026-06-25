const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const { protect } = require("../middleware/auth");
const { generateInsights } = require("../utils/insightAnalysis");

router.get("/", protect, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    const insight = generateInsights(entries);

    res.json({ insight });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "We could not generate insights right now." });
  }
});

module.exports = router;