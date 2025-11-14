import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "./A-panel";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/all");
        console.log("response", res);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="w-full flex h-full">
      <AdminPanel />
      <div className="w-full p-20">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">All Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-500 text-black">
                <tr>
                <th className="p-3">Tracking #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Pickup</th>
                <th className="p-3">Delivery</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? (
                orders.map((o) => (
                    <tr key={o._id} className="border-b hover:bg-yellow-100">
                    <td className="p-3">{o.trackingNumber}</td>
                    <td className="p-3">{o.name}</td>
                    <td className="p-3">{o.phone}</td>
                    <td className="p-3">{o.pickupAddress}</td>
                    <td className="p-3">{o.deliveryAddress}</td>
                    <td className="p-3">{o.weight}</td>
                    <td className="p-3 text-green-600 font-semibold">
                        {o.status || "Pending"}
                    </td>
                    <td className="p-3">
                        {new Date(o.date).toLocaleString("en-PK", {
                        timeZone: "Asia/Karachi",
                        })}
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                    No orders found yet.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>

    </section>
  );
};

export default Orders;
