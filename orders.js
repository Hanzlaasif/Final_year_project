const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Feedback = require("../models/feedback");   // <-- New Feedback Model Added

// =========================
// Generate Tracking Number
// =========================
function generateTrackingNumber() {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${Date.now()}${randomPart}`;
}

// =========================
// Generate Payment
// =========================
function generatePayment(weight) {
  return Number(weight) * 250;
}

// =========================
// Pakistan Standard Time
// =========================
function getPakistanDate() {
  const now = new Date();
  const pakistanOffset = 5 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = pakistanOffset + localOffset;
  return new Date(now.getTime() + diff * 60 * 1000);
}

// ============================
// Create New Order
// ============================
router.post("/submit", async (req, res) => {
  try {
    const { name, phone, weight, pickupAddress, deliveryAddress } = req.body;

    if (!name || !phone || !weight || !pickupAddress || !deliveryAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trackingNumber = generateTrackingNumber();
    const payment = generatePayment(weight);

    const newOrder = new Order({
      name,
      phone,
      weight,
      pickupAddress,
      deliveryAddress,
      payment,
      trackingNumber,
      date: getPakistanDate(),
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      trackingNumber,
      payment,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ======================================
// Track Order
// ======================================
router.get("/track/:trackingNumber", async (req, res) => {
  try {
    const order = await Order.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================
// Admin – Get All Orders
// ======================================
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ======================================
// Dashboard Stats
// ======================================
router.get("/dashboard-stats", async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    const orders = await Order.find({ date: { $gte: weekAgo } });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyStats = dayNames.map((day) => ({
      day,
      totalOrders: 0,
      Delivered: 0,
      failed: 0,
    }));

    orders.forEach((order) => {
      const dayIndex = new Date(order.date).getDay();
      const stat = dailyStats[dayIndex];

      stat.totalOrders++;
      if (order.status === "Delivered") stat.Delivered++;
      if (order.status === "failed") stat.failed++;
    });

    res.json({
      stats: {
        total: orders.length,
        Delivered: orders.filter((o) => o.status === "Delivered").length,
        pending: orders.filter((o) => o.status === "pending").length,
        failed: orders.filter((o) => o.status === "failed").length,
      },
      chartData: dailyStats,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================
// Update Payment Status
// ======================================
router.put("/update-paymentstatus/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentstatus: req.body.paymentstatus },
      { new: true }
    );

    res.json({ message: "PaymentStatus updated", updated });
  } catch {
    res.paymentstatus(500).json({ message: "Error updating paymentstatus" });
  }
});

// ======================================
// Update Order Status
// ======================================
router.put("/update-status/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ message: "Status updated", updated });
  } catch {
    res.status(500).json({ message: "Error updating status" });
  }
});


// ===================================================
// 📍 CUSTOMER FEEDBACK SYSTEM ADDED BELOW
// ===================================================

// ⭐ Submit Feedback
router.post("/feedbacks/submit", async (req, res) => {
  try {
    const { trackingNumber, name, rating, review } = req.body;

    const order = await Order.findOne({ trackingNumber });
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
// const express = require("express");
// const router = express.Router();
// const Order = require("../models/order");

// // Generate Tracking Number
// function generateTrackingNumber() {
//   const randomPart = Math.floor(100000 + Math.random() * 900000);
//   return `${Date.now()}${randomPart}`;
// }

// // Generate Payment (Rs 250 per KG)
// function generatePayment(weight) {
//   return Number(weight) * 250;
// }

// // Get current Pakistan Standard Time
// function getPakistanDate() {
//   const now = new Date();
//   const pakistanOffset = 5 * 60;
//   const localOffset = now.getTimezoneOffset();
//   const diff = pakistanOffset + localOffset;
//   return new Date(now.getTime() + diff * 60 * 1000);
// }

// // ============================
// // Create New Order
// // ============================
// router.post("/submit", async (req, res) => {
//   try {
//     const { name, phone, weight, pickupAddress, deliveryAddress } = req.body;

//     if (!name || !phone || !weight || !pickupAddress || !deliveryAddress) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const trackingNumber = generateTrackingNumber();
//     const payment = generatePayment(weight);   // 💰 Correct payment calculation

//     const newOrder = new Order({
//       name,
//       phone,
//       weight,
//       pickupAddress,
//       deliveryAddress,
//       payment,              // ✅ Save in DB
//       trackingNumber,
//       date: getPakistanDate(),
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       trackingNumber,
//       payment,              // Return to frontend
//     });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Track by Tracking Number
// router.get("/track/:trackingNumber", async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       trackingNumber: req.params.trackingNumber,
//     });

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json(order);
//   } catch (error) {
//     console.error("Error tracking order:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get All Orders (Admin)
// router.get("/all", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ date: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Dashboard Stats
// router.get("/dashboard-stats", async (req, res) => {
//   try {
//     const today = new Date();
//     const weekAgo = new Date();
//     weekAgo.setDate(today.getDate() - 6);

//     const orders = await Order.find({ date: { $gte: weekAgo } });

//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const dailyStats = dayNames.map((day) => ({
//       day,
//       totalOrders: 0,
//       Delivered: 0,
//       failed: 0,
//     }));

//     orders.forEach((order) => {
//       const dayIndex = new Date(order.date).getDay();
//       const stat = dailyStats[dayIndex];

//       stat.totalOrders++;
//       if (order.status === "Delivered") stat.Delivered++;
//       if (order.status === "failed") stat.failed++;
//     });

//     res.json({
//       stats: {
//         total: orders.length,
//         Delivered: orders.filter((o) => o.status === "Delivered").length,
//         pending: orders.filter((o) => o.status === "pending").length,
//         failed: orders.filter((o) => o.status === "failed").length,
//       },
//       chartData: dailyStats,
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update Payment Status
// router.put("/update-paymentstatus/:id", async (req, res) => {
//   try {
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { paymentstatus: req.body.paymentstatus },
//       { new: true }
//     );

//     res.json({ message: "PaymentStatus updated", updated });
//   } catch {
//     res.paymentstatus(500).json({ message: "Error updating paymentstatus" });
//   }
// });

// // Update Order Status
// router.put("/update-status/:id", async (req, res) => {
//   try {
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );

//     res.json({ message: "Status updated", updated });
//   } catch {
//     res.status(500).json({ message: "Error updating status" });
//   }
// });

// module.exports = router;
