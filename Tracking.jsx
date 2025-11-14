import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Tracking = () => {
  const { trackingNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/track/${trackingNumber}`
        );
        setOrder(res.data);
      } catch {
        setError("Order not found.");
      }
    };
    fetchOrder();
  }, [trackingNumber]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!order) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <section
      className="bg-dark text-white min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/b1.png')", // same image as Banner.jsx
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl w-full mx-auto mt-20 p-8 bg-black/70 shadow-lg rounded-2xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-yellow mb-6 text-center">
          Tracking Details
        </h2>
        <p className="text-lg mb-4 text-center">
          Tracking Number:{" "}
          <span className="font-mono text-yellow">{trackingNumber}</span>
        </p>

        {/* Order Details */}
        <div className="border-b border-yellow/40">
          <button
            onClick={() => toggleSection("order")}
            className="w-full flex justify-between items-center py-3 text-left font-semibold text-yellow"
          >
            Order Details
            <span>{openSection === "order" ? "-" : "+"}</span>
          </button>
          {openSection === "order" && (
            <div className="p-4 bg-white/10 rounded-lg">
              <p>
                <strong className="text-yellow">Name:</strong> {order.name}
              </p>
              <p>
                <strong className="text-yellow">Phone:</strong> {order.phone}
              </p>
              <p>
                <strong className="text-yellow">Weight:</strong> {order.weight}
              </p>
            </div>
          )}
        </div>

        {/* Address Details */}
        <div className="border-b border-yellow/40">
          <button
            onClick={() => toggleSection("address")}
            className="w-full flex justify-between items-center py-3 text-left font-semibold text-yellow"
          >
            Address Details
            <span>{openSection === "address" ? "-" : "+"}</span>
          </button>
          {openSection === "address" && (
            <div className="p-4 bg-white/10 rounded-lg">
              <p>
                <strong className="text-yellow">Pickup:</strong>{" "}
                {order.pickupAddress}
              </p>
              <p>
                <strong className="text-yellow">Delivery:</strong>{" "}
                {order.deliveryAddress}
              </p>
            </div>
          )}
        </div>

        {/* Booking Details */}
        <div>
          <button
            onClick={() => toggleSection("booking")}
            className="w-full flex justify-between items-center py-3 text-left font-semibold text-yellow"
          >
            Booking Details
            <span>{openSection === "booking" ? "-" : "+"}</span>
          </button>
          {openSection === "booking" && (
            <div className="p-4 bg-white/10 rounded-lg">
              <p>
                <strong className="text-yellow">Date:</strong>{" "}
                {new Date(order.date).toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                })}
              </p>
              <p>
                <strong className="text-yellow">Status:</strong>{" "}
                {order.status || "Pending"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tracking;
