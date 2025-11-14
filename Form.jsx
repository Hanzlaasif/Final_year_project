import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    weight: "",
    pickupAddress: "",
    deliveryAddress: "",
  });

  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTrackingNumber("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders/submit",
        formData
      );
      alert("Order Placed Successfully");
      setTrackingNumber(res.data.trackingNumber);
      setFormData({
        name: "",
        phone: "",
        weight: "",
        pickupAddress: "",
        deliveryAddress: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Order placement failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-dark text-white min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left: Form */}
      <form onSubmit={handleSubmit} className="md:w-1/2 w-full p-10 space-y-6">
        <div>
          <label className="block text-yellow text-lg font-bold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-white text-dark rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-yellow text-lg font-bold mb-1">Phone no.</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-white text-dark rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Weight Field with Hover Help */}
        <div className="relative">
          <label className=".block text-yellow text-lg font-bold mb-1 .flex items-center gap-2">
            Weight
            <div className="relative group">
              <span className="bg-yellow text-black w-5 h-5 flex items-center justify-center rounded-full text-sm font-bold cursor-pointer">
                ?
              </span>

              {/* Hover Dropdown */}
              <div className="absolute left-6 top-0 mt-1 w-56 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-3 text-sm">
                <p className="font-semibold mb-1">Vehicle Type & Weight Range</p>
                <ul className="space-y-1">
                  <li><strong>Bike:</strong> 1 to 10 kg</li>
                  <li><strong>Pickup:</strong> 10 to 50 kg</li>
                  <li><strong>Truck:</strong> 50 to 100 kg</li>
                  <li><strong>Air Mode:</strong> 100 to 500 kg</li>
                  <li><strong>Sea Mode:</strong> 500 to 1000 kg</li>
                </ul>
              </div>
            </div>
          </label>

          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-3 bg-white text-dark rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-yellow text-lg font-bold mb-1">
            Pickup Address
          </label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="w-full p-3 bg-white text-dark rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-yellow text-lg font-bold mb-1">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className="w-full p-3 bg-white text-dark rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Order Button */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow text-black px-6 py-2 font-semibold rounded-sm hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Placing..." : "ORDER PLACE"}
          </button>
        </div>

        {/* Tracking Number Display */}
        {trackingNumber && (
          <p className="mt-4 text-white font-bold">
            Your Tracking Number: {trackingNumber}
          </p>
        )}
      </form>

      {/* Right: Image */}
      <div className="md:w-1/2 w-full">
        <img
          src="/19c.png"
          alt="Warehouse Order"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Form;
