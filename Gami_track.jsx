// import React, { useState } from "react";
// import axios from "axios";

// const TrackOrder = () => {
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [order, setOrder] = useState(null);
//   const [error, setError] = useState("");

//   const handleTrack = async (e) => {
//     e.preventDefault();
//     setError("");
//     setOrder(null);

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/orders/track/${trackingNumber}`
//       );
//       if (!res.data) {
//         setError("Invalid tracking number ❌");
//       } else {
//         setOrder(res.data);
//       }
//     } catch (err) {
//       setError("Invalid tracking number ❌");
//     }
//   };

//   const steps = [
//     { label: "Order Booked", emoji: "📝" },
//     { label: "Package Ready", emoji: "📦" },
//     { label: "On The Way", emoji: "🚚" },
//     { label: "Delivered", emoji: "✅" },
//   ];

//   const getStepStatus = (currentStatus, stepLabel) => {
//     const orderStages = ["Booked", "Ready", "OnWay", "Delivered"];
//     const currentIndex = orderStages.indexOf(currentStatus);
//     const stepIndex = orderStages.indexOf(stepLabel);
//     if (stepIndex < currentIndex) return "completed";
//     if (stepIndex === currentIndex) return "current";
//     return "pending";
//   };

//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
//         <h2 className="text-3xl font-bold text-yellow-600 mb-4">📦 Track Your Order</h2>

//         <form onSubmit={handleTrack} className="flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Enter Tracking Number"
//             value={trackingNumber}
//             onChange={(e) => setTrackingNumber(e.target.value)}
//             className="p-3 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md"
//           >
//             Track Now 🚀
//           </button>
//         </form>

//         {/* Error Message */}
//         {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}

//         {/* Tracking Result */}
//         {order && (
//           <div className="mt-8">
//             <h3 className="text-xl font-bold text-gray-700 mb-4">
//               Tracking Number:{" "}
//               <span className="text-yellow-600">{order.trackingNumber}</span>
//             </h3>
//             <div className="flex flex-col gap-4 items-start">
//               {steps.map((step) => {
//                 const status = getStepStatus(order.status, step.label);
//                 return (
//                   <div
//                     key={step.label}
//                     className={`flex items-center gap-3 w-full p-3 rounded-md transition-all ${
//                       status === "completed"
//                         ? "bg-green-100 text-green-700 border-l-4 border-green-500"
//                         : status === "current"
//                         ? "bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500"
//                         : "bg-gray-100 text-gray-500 border-l-4 border-gray-300"
//                     }`}
//                   >
//                     <span className="text-2xl">{step.emoji}</span>
//                     <span className="font-semibold">{step.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TrackOrder;
