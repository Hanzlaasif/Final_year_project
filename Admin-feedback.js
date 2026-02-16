const mongoose = require("mongoose");

const AdminFeedbackSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminFeedback", AdminFeedbackSchema);
