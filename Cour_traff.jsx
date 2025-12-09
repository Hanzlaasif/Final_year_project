import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

// Custom rider icon
const riderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

export default function CourierTracking() {
  const [position, setPosition] = useState({ lat: 30.3753, lng: 69.3451 }); // default pakistan
  const [address, setAddress] = useState("Fetching address...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 📌 SIMULATE REAL-TIME RIDER TRACKING (Replace with backend realtime data)
    const interval = setInterval(() => {
      setPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 📌 Convert Lat/Lng → Address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
        );
        setAddress(res.data.display_name);
        setLoading(false);
      } catch (error) {
        setAddress("Unable to fetch address");
      }
    };

    fetchAddress();
  }, [position]);

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">
        🚚 Courier Real-Time Rider Tracking
      </h1>

      {/* Map Section */}
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={15}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[position.lat, position.lng]} icon={riderIcon}>
            <Popup>
              Rider Location <br />
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Address Section */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">📍 Current Address</h2>
        <p className="mt-2 text-gray-800">
          {loading ? "Loading..." : address}
        </p>
      </div>
    </div>
  );
}
//"leaflet": "^1.9.4",
