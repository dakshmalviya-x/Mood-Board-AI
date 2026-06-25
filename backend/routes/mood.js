const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const Journal = require("../models/Journal");
const { analyzeMoodText } = require("../utils/moodAnalysis");

router.post("/analyze", protect, async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      message: "No text provided"
    });
  }

  try {
    const mood = analyzeMoodText(text);

    const journal = await Journal.create({
      user: req.user._id,
      text,
      mood
    });

    res.json({
      journal,
      mood
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "We could not process that entry right now. Please try again."
    });
  }
});

router.get("/entries", protect, async (req, res) => {

  try {

    const entries = await Journal.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    });

    res.json(entries);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;