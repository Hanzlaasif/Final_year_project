import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; //Import person icon

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      alert(res.data.message || 'Login successful');
      navigate('/'); // Redirect to dashboard after login
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="bg-dark h-screen text-white flex justify-center items-center relative">
      {/* 👤 Person Icon at top-right corner */}
      <Link
        to="/a-login" //change this to the page you want
        className="absolute top-6 right-6 text-yellow hover:text-white transition"
        title="Go to Admin Panel"
      >
        <FaUserCircle size={35} />
      </Link>

      <div className="max-w-5xl w-full mx-auto flex flex-col-reverse md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10 px-6">
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div className="absolute -right-4 top-6 w-4 h-8 bg-yellow"></div>
          <img
            src="/b1.png"
            alt="Login Illustration"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 w-full bg-dark p-8 rounded-xl shadow-xl">
          <Link to={"/"}>
            <img src="/Pr-logo.png" alt="Logo" className="mb-4 w-32 mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-yellow mb-6 text-center">Login</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow text-dark font-semibold py-2 rounded hover:bg-yellow transition"
            >
              LogIn
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-yellow hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

