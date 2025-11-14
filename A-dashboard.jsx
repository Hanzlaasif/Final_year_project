import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "./A-panel";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    Delivered: 0,
    pending: 0,
    failed: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/dashboard-stats");
        console.log("Response", res);
        setStats(res.data.stats); // fallback
        setChartData(res.data.chartData || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-yellow-500 text-xl">
        Loading Dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );

  return (
    <section className="w-full flex bg-gray-100 min-h-screen">
      <AdminPanel />

      <div className="w-full md:w-[80%] p-10 overflow-y-auto">
        <h2 className="text-4xl font-bold text-yellow-500 mb-8 border-b-4 border-yellow-400 pb-3">
          📦 Dashboard Overview
        </h2>

        {/* Order Summary Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white hover:shadow-xl transition-all p-6 rounded-lg text-center border-t-4 border-yellow-400">
            <FaBox className="mx-auto text-4xl text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.total}</p>
          </div>
          <div className="bg-white hover:shadow-xl transition-all p-6 rounded-lg text-center border-t-4 border-green-500">
            <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Delivered</h3>
            <p className="text-3xl font-bold text-green-600">{stats.Delivered}</p>
          </div>
          <div className="bg-white hover:shadow-xl transition-all p-6 rounded-lg text-center border-t-4 border-orange-400">
            <FaClock className="mx-auto text-4xl text-orange-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
          </div>
          <div className="bg-white hover:shadow-xl transition-all p-6 rounded-lg text-center border-t-4 border-red-500">
            <FaTimesCircle className="mx-auto text-4xl text-red-500 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Failed</h3>
            <p className="text-3xl font-bold text-red-500">{stats.failed}</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Line Chart - Order Trends */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
    📈 Weekly Order Trends
  </h3>

  {chartData && chartData.length > 0 ? (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip
          formatter={(value, name) => [`${value} Orders`, name]}
          labelFormatter={(label) => `📅 ${label}`}
        />
        <Line
          type="monotone"
          dataKey="totalOrders"
          stroke="#FACC15"
          strokeWidth={3}
          name="Total Orders"
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
        <Line
          type="monotone"
          dataKey="Delivered"
          stroke="#16A34A"
          strokeWidth={3}
          name="Delivered"
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
        <Line
          type="monotone"
          dataKey="failed"
          stroke="#DC2626"
          strokeWidth={3}
          name="Failed"
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <p className="text-gray-500 text-center py-10">
      No orders recorded in the last 7 days.
    </p>
  )}
</div>


          {/* Bar Chart - Status Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              📊 Status Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={[stats]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="status" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Delivered" fill="#16A34A" name="Delivered" barSize={40} />
                <Bar dataKey="pending" fill="#F97316" name="Pending" barSize={40} />
                <Bar dataKey="failed" fill="#DC2626" name="Failed" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
