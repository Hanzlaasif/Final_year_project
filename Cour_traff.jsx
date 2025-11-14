// // src/components/CourierTraffic.jsx
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { io } from "socket.io-client";

// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
// const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // set in .env

// const containerStyle = {
//   width: "100%",
//   height: "520px",
// };

// export default function CourierTraffic() {
//   const [trackingId, setTrackingId] = useState("TRACK123"); // default
//   const [connected, setConnected] = useState(false);
//   const [markerPos, setMarkerPos] = useState(null);
//   const [address, setAddress] = useState("");
//   const socketRef = useRef(null);
//   const geocoderRef = useRef(null);

//   // load google maps script
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_API_KEY,
//     libraries: ["places"],
//   });

//   // initialize socket
//   useEffect(() => {
//     socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
//     const socket = socketRef.current;

//     socket.on("connect", () => {
//       console.log("Connected to socket server", socket.id);
//       setConnected(true);
//     });

//     socket.on("disconnect", () => setConnected(false));

//     // receive location updates (broadcasted)
//     socket.on("rider_location_update", (payload) => {
//       const { lat, lng, timestamp } = payload;
//       setMarkerPos({ lat, lng, timestamp });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // join room when tracking id changes
//   const joinRoom = useCallback(() => {
//     if (!socketRef.current) return;
//     socketRef.current.emit("join_room", trackingId);
//     setAddress("");
//     setMarkerPos(null);
//   }, [trackingId]);

//   // when marker changes, reverse geocode to address
//   useEffect(() => {
//     if (!isLoaded || !markerPos) return;

//     // create geocoder once
//     if (!geocoderRef.current) {
//       // eslint-disable-next-line no-undef
//       geocoderRef.current = new window.google.maps.Geocoder();
//     }

//     const latlng = { lat: parseFloat(markerPos.lat), lng: parseFloat(markerPos.lng) };
//     geocoderRef.current.geocode({ location: latlng }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         setAddress(results[0].formatted_address);
//       } else {
//         setAddress("Address not found");
//       }
//     });
//   }, [markerPos, isLoaded]);

//   // center map on marker or default location
//   const center = markerPos ? { lat: markerPos.lat, lng: markerPos.lng } : { lat: 24.8607, lng: 67.0011 };

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-yellow-400 mb-6">Courier Traffic — Live Rider Tracking</h1>

//         <div className="flex gap-6 mb-6">
//           <input
//             value={trackingId}
//             onChange={(e) => setTrackingId(e.target.value)}
//             className="p-3 rounded bg-gray-800 border border-gray-700 flex-1"
//             placeholder="Enter tracking id (e.g. TRACK123)"
//           />
//           <button
//             onClick={joinRoom}
//             className="px-5 py-3 bg-yellow-500 text-black font-semibold rounded"
//           >
//             Track
//           </button>
//           <div className={`px-4 py-3 rounded ${connected ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}`}>
//             {connected ? "Socket Connected" : "Socket Disconnected"}
//           </div>
//         </div>

//         <div className="bg-gray-900 rounded shadow p-4">
//           {!isLoaded ? (
//             <div className="p-12 text-center">Loading map...</div>
//           ) : (
//             <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
//               {markerPos && (
//                 <Marker
//                   position={{ lat: markerPos.lat, lng: markerPos.lng }}
//                   label={{
//                     text: "🛵",
//                     className: "text-2xl",
//                   }}
//                 />
//               )}
//             </GoogleMap>
//           )}

//           <div className="mt-4 p-4 bg-gray-800 rounded flex items-start gap-4">
//             <div className="flex-1">
//               <p className="text-sm text-gray-400">Rider current address:</p>
//               <p className="text-lg text-yellow-400 font-semibold">{address || "—"}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-400">Last update</p>
//               <p className="text-sm">{markerPos ? new Date(markerPos.timestamp).toLocaleString() : "—"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
