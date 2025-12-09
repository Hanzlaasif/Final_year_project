import React, { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderFound, setOrderFound] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // Check Tracking Number
  const verifyOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${trackingNumber}`);
      if (res.data) {
        setOrderFound(true);
      }
    } catch (error) {
      alert("Invalid Tracking Number ❌");
      setOrderFound(false);
    }
    setLoading(false);
  };

  // Submit Feedback
  const submitFeedback = async () => {
    if (!feedback.trim()) return alert("Write feedback first!");

    try {
      const res = await axios.post("http://localhost:5000/api/orders/feedbacks/feedbacks/submit", {
        trackingNumber,
        rating,
        feedback
      });
      if (res.data) {
        setOrderFound(true);
      }

      alert("Feedback Submitted Successfully 👍");
      setTrackingNumber("");
      setFeedback("");
      setOrderFound(true);

    } catch (err) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-10 px-4">
      
      <div className="w-full max-w-xl bg-[#111] shadow-xl border border-yellow-500 rounded-xl p-8">

        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          📝 Customer Feedback
        </h1>

        {/* Tracking Number Input */}
        {!orderFound && (
          <div>
            <label className="text-yellow-300 font-semibold">Enter Tracking Number</label>
            <input
              type="number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g 20241205123456"
              className="w-full p-3 mt-2 bg-black border border-yellow-500 rounded-md text-white placeholder-gray-400"
            />

            <button 
              onClick={verifyOrder}
              disabled={loading}
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md transition"
            >
              {loading ? "Checking..." : "VERIFY ORDER"}
            </button>
          </div>
        )}

        {/* Feedback Section */}
        {orderFound && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-green-400">Order Verified ✔</h2>

            <label className="block text-yellow-300 mt-4 font-semibold">Rating ⭐</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 bg-black text-white border border-yellow-500 rounded-md mt-2"
            >
              <option value="5">5 ★ Excellent</option>
              <option value="4">4 ★ Good</option>
              <option value="3">3 ★ Average</option>
              <option value="2">2 ★ Poor</option>
              <option value="1">1 ★ Very Bad</option>
            </select>

            <label className="block text-yellow-300 font-semibold mt-4">
              Feedback Message
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              placeholder="Write your experience..."
              className="w-full p-3 bg-black text-white rounded-md border border-yellow-500 mt-2"
            ></textarea>

            <button
              onClick={submitFeedback}
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md transition"
            >
              Submit Feedback 📨
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Feedback;
