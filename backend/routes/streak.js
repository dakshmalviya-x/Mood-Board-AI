const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res) => {

  try {

    const entries = await Journal.find({
      user: req.user._id
    }).sort({
      createdAt: 1
    });

    if (entries.length === 0) {

      return res.json({
        currentStreak: 0,
        longestStreak: 0
      });

    }

    const days = [
      ...new Set(
        entries.map(entry =>
          new Date(entry.createdAt)
            .toISOString()
            .slice(0, 10)
        )
      )
    ];

    let longestStreak = 1;
    let currentStreak = 1;
    let streak = 1;

    for (let i = 1; i < days.length; i++) {

      const prev = new Date(days[i - 1]);
      const curr = new Date(days[i]);

      const diff =
        (curr - prev) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {

        streak++;

      } else {

        streak = 1;

      }

      longestStreak = Math.max(
        longestStreak,
        streak
      );

    }

    streak = 1;

    for (let i = days.length - 1; i > 0; i--) {

      const curr = new Date(days[i]);
      const prev = new Date(days[i - 1]);

      const diff =
        (curr - prev) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {

        streak++;

      } else {

        break;

      }

    }

    currentStreak = streak;

    res.json({
      currentStreak,
      longestStreak
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;