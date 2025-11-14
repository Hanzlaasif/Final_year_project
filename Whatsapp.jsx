import React from "react";

export default function WhatsApp() {
  const phoneNumber = "923225808035"; // Your WhatsApp number (without +)

  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50"
      style={{ width: "60px", height: "60px" }}
    >
      <img
        src="/whatsapp_icon.jpg"
        alt="WhatsApp"
        className="w-10 h-10"
      />
    </a>
  );
}
