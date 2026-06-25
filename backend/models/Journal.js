const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  mood: {
    emotion: String,
    score: Number,
    colors: [String],
    keywords: [String],
    summary: String,
  },
}, { timestamps: true });

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;