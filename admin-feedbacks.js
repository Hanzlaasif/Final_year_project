const express = require("express");
const router = express.Router();
const AdminFeedback = require("../models/Admin-feedback");

// 📦 Get all feedbacks (for Admin)
router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await AdminFeedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
