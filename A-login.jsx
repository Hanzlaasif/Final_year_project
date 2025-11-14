import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiUser } from "react-icons/fi"; // 👈 Import user icon

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/alogin", form);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/a-dashboard");
    } catch (err) {
      alert("Invalid email or password");
      navigate("/a-login");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/b1.png')",
      }}
    >
      <div className="relative bg-white bg-opacity-90 p-8 shadow-lg rounded-2xl w-96">

        {/* 👤 Person Icon in top-right corner */}
        <Link
          to="/r-login" // 👈 change this to your desired route
          className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-700 transition"
          title="Go to Rider Panel"
        >
          <FiUser size={26} />
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/a-signup" className="text-yellow-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

