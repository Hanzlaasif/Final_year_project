import React from 'react';

export default function Technology() {
  return (
    <section className="pt-24 bg-dark text-white h-screen px-6 py-12 md:px-20">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Left Column - Text */}
        <div className="md:col-span-1">
          <h2 className="text-5xl font-bold text-yellow leading-tight mb-6">
            Role of <br />Technology<br /> in <br />Courier360
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Technology plays a central role in the design, execution, 
            and innovation of the Courier360 platform. From user interaction 
            to logistics optimization, every component of the system leverages 
            modern tools to create a faster, smarter, and more efficient courier service. 
            The platform combines web and mobile applications, cloud computing, real-time APIs, 
            and geolocation services to deliver a seamless experience to customers, riders, and 
            administrators.
          </p>
        </div>

        {/* Center Column - Top Image */}
        <div className="md:col-span-1">
          <img
            src="/20d.png" 
            alt="Technology Ship"
            className="w-full object-cover rounded shadow-lg"
          />
        </div>

        {/* Right Column - Paragraph + Image */}
        <div className="md:col-span-1 flex flex-col justify-between h-full">
          <p className="text-sm text-gray-300 mb-6">
            <strong>QR Code Scanning:</strong> Every parcel is tagged with a 
            unique QR code to ensure secure and verifiable deliveries, eliminating 
            manual errors and fraud. <br /><br />
            <strong>Marketplace Integration:</strong> The freelance rider system 
            is powered by intelligent matching algorithms, enabling task distribution 
            based on rider availability and proximity.
          </p>
          <div className="relative">
            <img
              src="/21e.png" 
              alt="Freight Tech"
              className="w-full object-cover rounded shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-10 md:h-10 bg-yellow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
