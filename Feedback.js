const mongoose = require("mongoose");

// Feedback Sub-Document inside Order Model
const FeedbackSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("feedback", FeedbackSchema);
