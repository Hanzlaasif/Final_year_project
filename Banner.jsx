import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Banner = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTrack = async () => {
    setError("");

    if (!trackingNumber) {
      setError("Please enter a tracking number.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${trackingNumber}`);
      if (res.data) {
        navigate(`/Tracking/${trackingNumber}`);
      } else {
        setError("T_number not found.");
      }
    } catch (err) {
      setError("Tracking number not found.");
    }
  };

  return (
    <section
      className="pt-24 relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url("/b1.png")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 space-y-8 p-10 w-4/5 max-w-4xl text-white">
        <h1 className="text-5xl font-bold">Track Your Order</h1>

        {/* Input + Button */}
        <div className="w-full h-16 flex overflow-hidden">
          <input
            type="number"
            placeholder="Enter Your Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-3/4 bg-white px-6 text-black text-lg outline-none"
          />
          <button
            type="button"
            onClick={handleTrack}
            className="w-1/4 bg-black text-white text-lg hover:bg-gray-900 transition"
          >
            Track Order
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Tagline */}
        <p className="bg-yellow mx-auto w-3/5 py-3 text-2xl text-center text-white font-bold">
          From Shop to Shop Business
        </p>
      </div>
    </section>
  );
};

export default Banner;
