import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RiderTracking = () => {
  const { trackingNumber } = useParams();
  const [isSharing, setIsSharing] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [locationInfo, setLocationInfo] = useState("Location not available");
  const [lastUpdate, setLastUpdate] = useState("Never");
  const [order, setOrder] = useState(null);
  const [manualAddress, setManualAddress] = useState("");
  const [useManualLocation, setUseManualLocation] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [trackingNumber]);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${trackingNumber}`);
      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const startSharing = async () => {
    try {
      console.log('Starting tracking for:', trackingNumber);
      // Start tracking on server
      const response = await axios.post(`http://localhost:5000/api/tracking/start/${trackingNumber}`);
      console.log('Server response:', response.data);

      if (useManualLocation) {
        // Use manual address
        if (!manualAddress.trim()) {
          alert('Please enter your current address');
          return;
        }
        await setManualLocation();
      } else {
        // Use GPS
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by this browser.');
          return;
        }

        const options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        };

        const id = navigator.geolocation.watchPosition(
          updateLocation,
          handleError,
          options
        );
        setWatchId(id);
      }

      setIsSharing(true);
      alert("Tracking started! Keep this page open during delivery.");
    } catch (error) {
      console.error("Error starting tracking:", error);
      console.error("Error details:", error.response?.data);
      alert(`Failed to start tracking: ${error.response?.data?.message || error.message}`);
    }
  };

  const stopSharing = async () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }

    try {
      await axios.post(`http://localhost:5000/api/tracking/stop/${trackingNumber}`);
      setIsSharing(false);
      alert("Tracking stopped");
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  };

  const updateLocation = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    try {
      await axios.post(`http://localhost:5000/api/tracking/update-location/${trackingNumber}`, {
        latitude,
        longitude
      });

      setLocationInfo(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}, Accuracy: ${accuracy.toFixed(0)}m`);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error updating location:', error);
      setLocationInfo('Failed to update location');
    }
  };

  const setManualLocation = async () => {
    try {
      // Convert address to coordinates using geocoding
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualAddress)}`
      );
      
      if (geocodeResponse.data && geocodeResponse.data.length > 0) {
        const location = geocodeResponse.data[0];
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);
        
        await axios.post(`http://localhost:5000/api/tracking/update-location/${trackingNumber}`, {
          latitude,
          longitude
        });
        
        setLocationInfo(`Manual Location: ${manualAddress}`);
        setLastUpdate(new Date().toLocaleTimeString());
      } else {
        alert('Address not found. Please enter a valid address.');
        setIsSharing(false);
      }
    } catch (error) {
      console.error('Error setting manual location:', error);
      setLocationInfo('Failed to set manual location');
      setIsSharing(false);
    }
  };

  const handleError = (error) => {
    let message = 'Unknown error occurred';
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = 'Location access denied by user';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information unavailable';
        break;
      case error.TIMEOUT:
        message = 'Location request timed out';
        break;
    }
    
    setLocationInfo(message);
    stopSharing();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4"
    style={{
        backgroundImage:
          "url('/b1.png')",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">
            🚚 Rider Location Sharing
          </h1>
          
          {order && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                <p><strong>Customer:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
              </div>
              <div>
                <p><strong>Pickup:</strong> {order.pickupAddress}</p>
                <p><strong>Delivery:</strong> {order.deliveryAddress}</p>
                <p><strong>Weight:</strong> {order.weight} kg</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Location Sharing Control</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Sharing Status:</label>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isSharing ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{isSharing ? 'Location sharing active' : 'Location sharing stopped'}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="mb-3">
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={useManualLocation}
                      onChange={(e) => setUseManualLocation(e.target.checked)}
                      className="mr-2"
                    />
                    Use Manual Address Instead of GPS
                  </label>
                  
                  {useManualLocation && (
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="Enter your current address (e.g., Lahore, Pakistan)"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}
                </div>
                
                <button
                  onClick={startSharing}
                  disabled={isSharing}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Start Sharing
                </button>
                <button
                  onClick={stopSharing}
                  disabled={!isSharing}
                  className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Stop Sharing
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Customer Tracking Link:</strong><br/>
                <a 
                  href={`http://localhost:5173/live-tracking/${trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  http://localhost:5173/live-tracking/{trackingNumber}
                </a>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Current Location:</label>
                <div className={`p-3 rounded ${isSharing ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <small>{locationInfo}</small>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Last Update:</label>
                <div className="text-gray-600">
                  <small>{lastUpdate}</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions for Rider:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click "Start Sharing" to begin sending your location to the customer</li>
              <li>• Keep this page open on your mobile device during delivery</li>
              <li>• Customer will see your real-time location on their tracking page</li>
              <li>• Click "Stop Sharing" when delivery is complete</li>
              <li>• Make sure location services are enabled on your device</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderTracking;
