import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "./A-panel";
import {
  LineChart, Line, CartesianGrid,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Dashboard = () => {
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [summary, setSummary] = useState({});
  const [orderRequests, setOrderRequests] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [riderRequests, setRiderRequests] = useState([]);
  const [view, setView] = useState("weekly");

  useEffect(() => {
    loadDashboard();
    loadOrderRequests();
    loadRiderRequests();
    loadRevenue();
  }, []);
     //LOAD DASHBOARD STATS
  const loadDashboard = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/orders/dashboard-stats"
    );
    setWeekly(res.data.weekly);
    setMonthly(res.data.monthly);
    setYearly(res.data.yearly);
    setSummary(res.data.summary);
  };

  /* =========================
     ORDER REQUESTS
  ========================= */
  const loadOrderRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/orders/requests");
    setOrderRequests(res.data);
  };

  const handleOrderDecision = async (id, action) => {
    await axios.post(
      `http://localhost:5000/api/orders/decision/${id}`,
      { action }
    );
    loadOrderRequests();
    loadDashboard();
  };

  /* =========================
     RIDER REQUESTS
  ========================= */
  const loadRiderRequests = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/rider/requests"
    );
    setRiderRequests(res.data);
  };

  const handleRiderDecision = async (id, action) => {
    await axios.post(
      `http://localhost:5000/api/rider/decision/${id}`,
      { action }
    );
    loadRiderRequests();
  };

  const loadRevenue = async () => {
  const res = await axios.get("http://localhost:5000/api/orders/total-revenue");
  setRevenue(res.data.totalRevenue);
};


  const chartData =
    view === "weekly" ? weekly :
    view === "monthly" ? monthly :
    yearly;

  return (
    <section
      className="flex min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('/b1.png')" }}
    >
      <AdminPanel />

      <div className="p-10 w-full">

        {/* =========================
           SUMMARY
        ========================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Card icon={<FaBox />} title="Total" value={summary.total} />
          <Card icon={<FaCheckCircle />} title="Delivered" value={summary.Delivered} />
          <Card icon={<FaClock />} title="Pending" value={summary.pending} />
          <Card icon={<FaTimesCircle />} title="Failed" value={summary.failed} />
          <Card icon="💰" title="Total Revenue" value={`Rs. ${revenue.toLocaleString("en-PK")}`} />
        </div>

        {/* =========================
           ORDER REQUESTS
        ========================= */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h3 className="text-xl font-bold mb-4">📦 Order Requests</h3>

          {orderRequests.length === 0 ? (
            <p className="text-gray-500">No order requests</p>
          ) : (
            orderRequests.map(o => (
              <div key={o._id} className="border p-3 rounded mb-3">
                <p><b>Tracking:</b> {o.trackingNumber}</p>
                <p><b>Weight:</b> {o.weight} kg</p>
                <p><b>Vehicle:</b> {o.vehicle}</p>

                <button
                  onClick={() => handleOrderDecision(o._id, "accept")}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleOrderDecision(o._id, "fail")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Fail
                </button>
              </div>
            ))
          )}
        </div>

        {/* =========================
           RIDER REQUESTS
        ========================= */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h3 className="text-xl font-bold mb-4">🏍 Rider Requests</h3>

          {riderRequests.length === 0 ? (
            <p className="text-gray-500">No rider requests</p>
          ) : (
            riderRequests.map(r => (
              <div key={r._id} className="border p-3 rounded mb-3">
                <p><b>Name:</b> {r.name}</p>
                <p><b>CNIC:</b> {r.cnic}</p>
                <p><b>Email:</b> {r.email}</p>

                <button
                  onClick={() => handleRiderDecision(r._id, "accept")}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleRiderDecision(r._id, "fail")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Fail
                </button>
              </div>
            ))
          )}
        </div>


        {/* =========================
           VIEW SWITCH
        ========================= */}
        <div className="flex gap-3 mb-4">
          {["weekly", "monthly", "yearly"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded ${
                view === v ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        {/* =========================
           LINE CHART
        ========================= */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="totalOrders" stroke="#FACC15" />
              <Line dataKey="Delivered" stroke="#16A34A" />
              <Line dataKey="failed" stroke="#DC2626" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* =========================
           STATUS BAR
        ========================= */}
        <div className="bg-white p-6 rounded shadow">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[summary]}>
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Delivered" fill="#16A34A" />
              <Bar dataKey="pending" fill="#F97316" />
              <Bar dataKey="failed" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </section>
  );
};

/* =========================
   SUMMARY CARD
========================= */
const Card = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value || 0}</p>
  </div>
);

export default Dashboard;

