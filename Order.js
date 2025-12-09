const mongoose = require("mongoose");

// Feedback Sub-Document inside Order Model
const FeedbackSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  weight: String,
  pickupAddress: String,
  deliveryAddress: String,
  trackingNumber: String,

  payment: String,
  paymentstatus: { type: String, default: "Unpaid" },

  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },

  // ⭐ Feedback stored inside the same order document
  feedback: [FeedbackSchema]
});

module.exports = mongoose.model("Order", OrderSchema);
// const mongoose = require("mongoose");

// // Order model (example schema)
// const OrderSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   weight: String,
//   pickupAddress: String,
//   deliveryAddress: String,
//   trackingNumber: String,
//   payment: String,
//   paymentstatus: {type: String, default: "Unpaid"},
//   status: { type: String, default: "pending"},
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", OrderSchema);
