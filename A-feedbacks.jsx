import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "./A-panel";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedbacks/all");
        console.log("response", res);
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <section className="w-full flex h-full"
    style={{
        backgroundImage:
          "url('/b1.png')",
      }}
    >
      <AdminPanel />
      <div className="w-full p-20">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">All Feedbacks</h2>

        <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-500 text-black">
                <tr>
                <th className="p-3">Tracking #</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Review</th>
                <th className="p-3">Date</th>
                </tr>
            </thead>
            <tbody>
                {feedbacks.length > 0 ? (
                feedbacks.map((f) => (
                    <tr key={f._id} className="border-b hover:bg-yellow-100">
                    <td className="p-3">{f.trackingNumber}</td>
                    <td className="p-3">{f.rating}</td>
                    <td className="p-3">{f.review}</td>
                    <td className="p-3">
                        {new Date(f.date).toLocaleString("en-PK", {
                        timeZone: "Asia/Karachi",
                        })}
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                    No feedbacks found yet.
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

export default Feedbacks;
