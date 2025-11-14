import React from 'react';

const DiffIn = () => {
  return (
    <section className="bg-dark text-white px-6 md:px-16 py-12 flex flex-col md:flex-row items-center justify-center gap-6">
      
      {/* Left images */}
      <div className="flex gap-4">
        <img
          src="/19.png"
          alt="Industry 1"
          className="w-[300px] h-[400px] object-cover"
        />
      </div>

      {/* Right text */}
      <div className="max-w-xl pl-4 relative">
        {/* Yellow square in top left corner */}
        <div className="w-6 h-6 bg-yellow absolute top-0 -left-4 md:-left-6"></div>

        <h2 className="text-yellow text-5xl font-bold leading-tight mb-6">
          Courier360 <br />
          in Different <br />
          Industries
        </h2>

        <p className="text-sm leading-relaxed text-justify">
          Courier360 is designed as a flexible, tech-powered courier platform 
          capable of serving multiple industries beyond just e-commerce. Its modular 
          features—such as real-time tracking, freelance rider marketplace, QR-based delivery 
          verification, and small business portals—allow it to adapt seamlessly to the needs 
          of various sectors.
        </p>
      </div>
    </section>
  );
};

export default DiffIn;
