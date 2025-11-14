import React from "react";
import { FaPhoneAlt, FaGlobe, FaEnvelope, FaArrowRight } from "react-icons/fa";

const Contact = () => {
  return (
 <section
      className='pt-24 relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'
      style={{ backgroundImage: 'url("/b1.png")' }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-8xl font-bold tracking-wide mb-8 text-white">CONTACT:</h1>

        <div className="bg-yellow px-8 py-4 flex flex-wrap items-center justify-center gap-6 rounded-md shadow-lg">
          <div className="flex items-center gap-2 text-white text-lg">
            <FaPhoneAlt />
            <span>+923225808035</span>
          </div>
          <div className="flex items-center gap-2 text-white text-lg">
            <FaGlobe />
            <span>www.courier360.com</span>
          </div>
          <div className="flex items-center gap-2 text-white text-lg">
            <FaEnvelope />
            <span>hanzlaasif65@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
