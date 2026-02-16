import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Leaflet icon fix */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const GamiTrack = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState("");

  // demo coordinates (NO CHANGE)
  const pickup = [31.5204, 74.3587];
  //const delivery = [33.6844, 73.0479];
  const delivery= [24.8607, 67.0011];
  const midPoint = [
    (pickup[0] + delivery[0]) / 2,
    (pickup[1] + delivery[1]) / 2,
  ];

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setActiveStep("");

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/track/${trackingNumber}`
      );
      setOrder(res.data);
    } catch {
      setError("Invalid tracking number ❌");
    }
  };

  // 🇵🇰 Current Pakistan Date & Time (DELIVERY TIME)
  const pakistanNow = () =>
    new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "medium",
      timeStyle: "medium",
    });

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover"
      style={{ backgroundImage: "url('/b1.png')" }}
    >
      <Link to="/" className="absolute top-6 left-6 text-white text-3xl">←</Link>

      <div className="bg-white/90 p-6 rounded-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          📦 Track Your Order
        </h2>

        <form onSubmit={handleTrack} className="flex gap-3 mb-6">
          <input
            type="number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 p-3 border rounded"
            placeholder="Tracking Number"
            required
          />
          <button className="bg-yellow-600 text-white px-6 rounded">
            Track
          </button>
        </form>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {order && (
          <>
            {/* STEPS */}
            <div className="flex justify-between mb-6">
              <button className="bg-gray-300 px-4 py-2 rounded">Booked</button>

              <button
                onClick={() => setActiveStep("OnWay")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                OnWay 🚚
              </button>

              <button
                onClick={() => setActiveStep("Delivered")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Delivered ✅
              </button>
            </div>

            {/* ================= ONWAY ================= */}
            {activeStep === "OnWay" && (
              <>
                {order.status === "pending" ? (
                  <>
                    <p className="text-center font-semibold mb-3 text-blue-700">
                      Now the order is on the way
                    </p>

                    <div className="h-[450px] w-full rounded overflow-hidden">
                      <MapContainer
                        center={midPoint}
                        zoom={6}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Polyline
                          positions={[pickup, delivery]}
                          pathOptions={{ dashArray: "8", color: "blue" }}
                        />
                        <Marker position={midPoint} />
                      </MapContainer>
                    </div>
                  </>
                ) : (
                  <p className="text-center font-semibold text-green-700">
                    The order is delivered
                  </p>
                )}
              </>
            )}

            {/* ================= DELIVERED ================= */}
            {activeStep === "Delivered" && (
              <>
                {order.status === "Delivered" ? (
                  <>
                    {/* DETAILS */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p><b>Name:</b> {order.name}</p>
                        <p><b>Phone:</b> {order.phone}</p>
                        <p><b>Weight:</b> {order.weight}</p>
                      </div>
                      <div>
                        <p><b>Pickup:</b> {order.pickupAddress}</p>
                        <p><b>Delivery:</b> {order.deliveryAddress}</p>
                      </div>
                      <div>
                        <p><b>Payment:</b> {order.payment}</p>
                        <p><b>Status:</b> {order.paymentstatus}</p>
                      </div>
                      <div>
                        {/* ✅ CORRECT DELIVERY DATE & TIME */}
                        <p><b>Delivered At:</b> {pakistanNow()}</p>
                      </div>
                    </div>

                    {/* MAP */}
                    <div className="h-[450px] w-full rounded overflow-hidden">
                      <MapContainer
                        center={delivery}
                        zoom={7}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Polyline
                          positions={[pickup, delivery]}
                          pathOptions={{ dashArray: "8", color: "green" }}
                        />
                        <Marker position={delivery} />
                      </MapContainer>
                    </div>
                  </>
                ) : (
                  <p className="text-center font-semibold text-blue-700">
                    Now the order is on the way
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GamiTrack;


