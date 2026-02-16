const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const Order = require("../models/Order");

// Pakistan Time
function getPakistanDate() {
  const now = new Date();
  const pakistanOffset = 5 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = pakistanOffset + localOffset;
  return new Date(now.getTime() + diff * 60 * 1000);
}

// ===================================================
// ⭐ SUBMIT FEEDBACK
// ===================================================
router.post("/submit", async (req, res) => {
  try {
    const { trackingNumber, rating, review } = req.body;

    // Check Order Exists
    const order = await Order.findOne({ trackingNumber });
    if (!order) {
      return res.status(404).json({ message: "Invalid Tracking Number" });
    }

    // Save Feedback
    const feedback = new Feedback({
      trackingNumber,
      rating,
      review,
      date: getPakistanDate(),
    });

    await feedback.save();

    res.json({ message: "Feedback submitted successfully", feedback });
  } catch (e) {
    res.status(500).json({ message: "Error saving feedback", error: e.message });
  }
});

// ===================================================
// 📌 GET FEEDBACK BY TRACKING NUMBER
// ===================================================
router.get("/track/:trackingNumber", async (req, res) => {
  try {
    const feedback = await Feedback.find({
      trackingNumber: req.params.trackingNumber,
    });

    if (!feedback.length)
      return res.status(404).json({ message: "No feedback found" });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

// ===================================================
// 📌 ADMIN — GET ALL FEEDBACKS
// ===================================================
router.get("/all", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ date: -1 });
    res.json(feedback);
  } catch {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

module.exports = router;
