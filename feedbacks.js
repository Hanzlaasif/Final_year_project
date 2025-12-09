const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// ===================================================
// 📍 CUSTOMER FEEDBACK SYSTEM ADDED BELOW
// ===================================================

// ⭐ Submit Feedback
router.post("/feedbacks/submit", async (req, res) => {
  try {
    const { trackingNumber, name, rating, review } = req.body;

    const order = await order.findOne({ trackingNumber });
    if (!order) return res.status(404).json({ message: "Invalid Tracking Number" });

    const feedback = new Feedback({
      trackingNumber,
      name,
      rating,
      review,
      date: getPakistanDate(),
    });

    await feedback.save();

    res.json({ message: "Feedback submitted successfully", feedback });
  } catch (e) {
    res.status(500).json({ message: "Error saving feedback", e });
  }
});




// Get Feedback by Tracking Number
router.get("/feedbacks/:trackingNumber", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      trackingNumber: req.params.trackingNumber,
    });

    if (!feedback.length)
      return res.status(404).json({ message: "No feedback found" });

    res.json(feedback);
  } catch {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

// Admin – All Feedbacks
router.get("/all-feedbacks", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ date: -1 });
    res.json(feedback);
  } catch {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

module.exports = router;
