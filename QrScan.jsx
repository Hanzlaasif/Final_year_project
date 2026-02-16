import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";

const QrScan = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [scanned, setScanned] = useState(false);

  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  /* =========================
     VERIFY TRACKING NUMBER
  ========================= */
  const checkTracking = async () => {
    setError("");
    setOrder(null);
    setShowQR(false);
    setScanned(false);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/track/${trackingNumber}`
      );

      setOrder(res.data);
      setShowQR(true);
    } catch {
      setError("Invalid tracking number");
    }
  };

  /* =========================
     START QR SCANNER
  ========================= */
  useEffect(() => {
    if (!showQR || scanned) return;

    const startScanner = async () => {
      scannerRef.current = new Html5Qrcode("qr-reader");

      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (decodedText === trackingNumber) {
              setScanned(true);
            } else {
              setError("QR does not match tracking number");
            }
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [showQR, scanned, trackingNumber]);

  return (
    <section
       className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover"
       style={{ backgroundImage: "url('/b1.png')" }}
    >
    <Link to="/" className="absolute top-6 left-6 text-white text-3xl">←</Link>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white max-w-xl w-full p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-4">
          QR Order Verification
        </h2>

        {/* INPUT */}
        <input
          type="number"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-3"
        />

        <button
          onClick={checkTracking}
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Verify Tracking Number
        </button>

        {error && (
          <p className="text-red-600 text-center mt-3">{error}</p>
        )}

        {/* QR CODE */}
        {showQR && (
          <div className="mt-6 text-center">
            <p className="font-semibold mb-2">Scan this QR code</p>
            <div className="flex justify-center">
              <QRCodeCanvas value={trackingNumber} size={180} />
            </div>
          </div>
        )}

        {/* CAMERA */}
        {showQR && !scanned && (
          <div className="mt-6">
            <div id="qr-reader" ref={qrRef} />
          </div>
        )}

        {/* ORDER DETAILS */}
        {order && scanned && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-2">Order Details</h3>

            <p><b>Name:</b> {order.name}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Tracking:</b> {order.trackingNumber}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Payment:</b> {order.paymentstatus}</p>
            <p><b>Pickup:</b> {order.pickupAddress}</p>
            <p><b>Delivery:</b> {order.deliveryAddress}</p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(order.date).toLocaleString("en-PK")}
            </p>
          </div>
        )}

      </div>
    </div>
    </section>
  );
};

export default QrScan;



