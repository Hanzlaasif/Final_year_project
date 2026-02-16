import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom rider icon
const riderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

const LiveTracking = () => {
  const { trackingNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [position, setPosition] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderDetails();
    const interval = setInterval(checkForUpdates, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [trackingNumber]);

  useEffect(() => {
    // Force map resize after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [position]);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${trackingNumber}`);
      setOrder(res.data);
    } catch (error) {
      setError("Order not found");
    }
  };

  const checkForUpdates = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tracking/location/${trackingNumber}`);
      const data = res.data;
      
      if (data.latitude && data.longitude) {
        setPosition([data.latitude, data.longitude]);
        setLastUpdated(new Date(data.lastUpdated));
        setIsActive(data.isActive);
        setError("");
      } else {
        setError("Rider hasn't started sharing location yet");
      }
    } catch (error) {
      setError("Tracking not available");
    }
  };

  if (error && !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ {error}</h2>
          <p className="text-gray-600">Please check your tracking number and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100"
    style={{
        backgroundImage:
          "url('/b1.png')",
      }}
    >
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">
            📦 Live Order Tracking
          </h1>
          
          {order && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Order Details</h3>
                <p><strong>Tracking #:</strong> {order.trackingNumber}</p>
                <p><strong>Customer:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Weight:</strong> {order.weight} kg</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Addresses</h3>
                <p><strong>Pickup:</strong> {order.pickupAddress}</p>
                <p><strong>Delivery:</strong> {order.deliveryAddress}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                <p><strong>Order Status:</strong> {order.status}</p>
                <p><strong>Payment:</strong> Rs {order.payment}</p>
                <p><strong>Payment Status:</strong> {order.paymentstatus}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-yellow-500">
            <h2 className="text-xl font-semibold text-black">🗺️ Live Location</h2>
            <div className="mt-2">
              {isActive ? (
                <div className="flex items-center text-green-800">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                  <span>Rider is sharing location</span>
                  {lastUpdated && (
                    <span className="ml-4 text-sm">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center text-red-800">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  <span>Waiting for rider to start sharing location...</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ height: '500px', width: '100%', position: 'relative' }}>
            {position ? (
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: '500px', width: '100%', zIndex: 1 }}
                scrollWheelZoom={true}
                key={`${position[0]}-${position[1]}`}
              >
                <TileLayer
                  attribution='© OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={riderIcon}>
                  <Popup>
                    <div>
                      <strong>🚚 Delivery Rider</strong><br/>
                      Order: {order?.name}<br/>
                      Last updated: {lastUpdated?.toLocaleTimeString()}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Waiting for Location
                  </h3>
                  <p className="text-gray-600">
                    The rider hasn't started sharing location yet.<br/>
                    Location will appear here once tracking begins.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📋 How Live Tracking Works:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your rider will start sharing location when they begin delivery</li>
            <li>• The map updates automatically every 5 seconds</li>
            <li>• You can see the real-time location of your delivery</li>
            <li>• Tracking stops when delivery is completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
