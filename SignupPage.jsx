import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-format CNIC
    if (name === 'cnic') {
      let digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 5 && digitsOnly.length <= 12) {
        digitsOnly = digitsOnly.replace(/^(\d{5})(\d+)/, '$1-$2');
      }
      if (digitsOnly.length > 12) {
        digitsOnly = digitsOnly.replace(/^(\d{5})(\d{7})(\d+)/, '$1-$2-$3');
      }
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) newErrors.name = 'Name must be at least 3 letters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|pk|edu|gov)$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
    else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) newErrors.cnic = 'Invalid CNIC format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^(\+92|03)[0-9]{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert(res.data.message);
      setFormData({
        name: '',
        email: '',
        cnic: '',
        phone: '',
        password: '',
      });
      setErrors({});
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <section className="bg-dark text-white flex justify-center items-center py-12">
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10 px-6">

        {/* Signup Form */}
        <div className="md:w-1/2 w-full bg-dark p-8 rounded-xl shadow-xl">
          <Link to={"/"}>
            <img src="/Pr-logo.png" alt="Logo" className="mb-4 w-32 mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-yellow mb-6 text-center">Create Your Account</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="Full Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* CNIC */}
            <div>
              <label className="block text-sm mb-1">CNIC</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                maxLength={15}
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="12345-6789012-3"
              />
              {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="+923xxxxxxxxx or 03xxxxxxxxx"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark text-white border border-dark rounded focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow text-dark font-semibold py-2 rounded hover:bg-yellow transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Already have an account? <Link to="/login" className="text-yellow hover:underline">Log in</Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div className="absolute -left-4 top-6 w-4 h-8 bg-yellow"></div>
          <img src="/b1.png" alt="Signup Illustration" className="w-full object-cover rounded-xl shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
