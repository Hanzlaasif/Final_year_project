import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white h-20 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src="/Pr-logo.png" alt="Courier360 Logo" className="w-32 h-32" />
        </Link>
      </div>

      {/* Main Navigation */}
      <ul className="flex space-x-8 text-sm sm:text-base font-semibold">
        <li className="hover:text-amber-300 transition">
          <Link to="/">Home</Link>
        </li>

        <li className="hover:text-amber-300 transition">
          <Link to="/about">About Us</Link>
        </li>

        {/* SERVICES DROPDOWN */}
        <li className="hover:text-amber-300 transition relative group cursor-pointer">
          <Link to="/services">Services</Link>
          <span className="hover:text-amber-300 transition"></span>

          {/* Dropdown */}
          <ul className="absolute left-0 mt-2 hidden group-hover:block bg-black text-white w-44 rounded-md shadow-lg py-2">
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Gamified Tracking</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Courier Traffic</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Freelance Marketplace</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Community Pickup</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Split delivery</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">QR-based Verification</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Tips for Rider</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/ex_ser">Small Businessess</Link>
            </li>
          </ul>
        </li>

        {/* ORDER PLACE DROPDOWN */}
        <li className="hover:text-amber-300 transition relative group cursor-pointer">
          <Link to="/order">Order Place</Link>
          <span className="hover:text-amber-300 transition"></span>

          <ul className="absolute left-0 mt-2 hidden group-hover:block bg-black text-white w-44 rounded-md shadow-lg py-2">
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/form">Bike</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/form">Pickup</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/form">Truck</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/form">Aeroplane</Link>
            </li>
            <li className="px-4 py-2 hover:bg-amber-300 hover:text-black transition">
              <Link to="/form">Ship</Link>
            </li>
          </ul>
        </li>

        <li className="hover:text-amber-300 transition">
          <Link to="/technology">Technology</Link>
        </li>

        <li className="hover:text-amber-300 transition">
          <Link to="/challenges">Challenges</Link>
        </li>

        <li className="hover:text-amber-300 transition">
          <Link to="/contact">Contact</Link>
        </li>

        <li className="hover:text-amber-300 transition">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

