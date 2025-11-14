import React from 'react';

const Introduction = () => {
  return (
    <section className="pt-24 bg-dark h-screen text-white flex justify-center items-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-10 md:space-y-0 md:space-x-10">
        
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold text-yellow mb-6">Introduction</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Courier360 is a comprehensive web-based Courier Management System designed to streamline the operations of courier service providers. It offers integrated modules for managing courier bookings, real-time tracking, hub logistics, employee assignments, and corporate client services. With a user-friendly interface and automation tools, Courier360 simplifies day-to-day tasks and enhances service delivery. The system is scalable, making it ideal for both local and nationwide logistics companies.
          </p>
          
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative">
          {/* Yellow Block */}
          <div className="absolute -left-4 top-6 w-4 h-8 bg-yellow"></div>
          <img
            src='/i1.png'
            alt="Containers"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Introduction;
