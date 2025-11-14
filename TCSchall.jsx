import React from 'react';

export default function TCSchall() {
  return (
    <section className="pt-24 bg-dark text-white px-6 py-12 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Column */}
        <div>
          <h2 className="text-5xl font-bold text-yellow mb-6 leading-tight">
            TCS and <br /> Courier360
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            As one of Pakistan’s oldest and most trusted courier services, 
            TCS enjoys an unparalleled brand reputation, extensive infrastructure, 
            and a large fleet of delivery vehicles and employees. For Courier360, 
            competing with TCS is a major challenge due to its strong customer trust, 
            fast nationwide coverage, and availability of premium services like same-day 
            and international shipping. TCS also offers a wide branch network and 
            COD (Cash on Delivery) services for e-commerce businesses. Courier360 
            must overcome the lack of physical infrastructure by leveraging smart 
            technologies and community-based delivery models.
          </p>
        </div>

        {/* Image Column */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow"></div>
          <img
            src="/20d.png"
            alt="TCS Infrastructure"
            className="w-full object-cover rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
