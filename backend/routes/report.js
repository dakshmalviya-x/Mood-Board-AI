const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const { protect } = require("../middleware/auth");

const PDFDocument = require("pdfkit");

router.get("/", protect, async (req, res) => {

  try {

    const entries = await Journal.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=mood-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(25)
      .text("MoodBoard AI Report");

    doc.moveDown();

    entries.forEach(entry => {

      doc
        .fontSize(14)
        .text(
          `${new Date(entry.createdAt).toLocaleDateString()}
${entry.mood.emotion}
Score: ${entry.mood.score}/10

${entry.mood.summary}

`
        );

      doc.moveDown();

    });

    doc.end();

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;