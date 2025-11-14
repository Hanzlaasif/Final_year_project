import React from 'react';

const History = () => {
  return (
    <section className="bg-dark text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-start gap-10">
      
      {/* Left side - stacked images with yellow bars */}
      <div className="md:w-1/2 space-y-6 relative">
        {/* Top Image */}
        <div className="relative">
          <div className="absolute left-[-20px] top-[20px] h-[30px] w-[15px] bg-yellow z-10" />
          <img
            src="/H1.png"
            alt="Shipping Containers"
            className="w-full rounded-md shadow-md relative z-20"
          />
        </div>

        {/* Bottom Image */}
        <div className="relative">
          <div className="absolute left-[-20px] bottom-[20px] h-[30px] w-[15px] bg-yellow z-10" />
          <img
            src="/H2.png"
            alt="Warehouse Worker"
            className="w-full rounded-md shadow-md relative z-20"
          />
        </div>
      </div>

      {/* Right side - heading and paragraph */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-5xl font-bold text-yellow">History</h2>
        <p className="leading-relaxed">
            Courier360 was conceived to address the growing demand for flexible,
            technology-driven courier services. With the rise of e-commerce, small business
            shipping, and freelance logistics, traditional courier companies often fail to
            meet modern customer expectations for speed, transparency, and interactivity.
            Courier360 aims to offer a complete, digital-first courier management system
            that bridges the gap between customers, riders, and service providers through
            one unified platform.
        </p>
        <p className="">
            The idea for Courier360 originated in response to growing inefficiencies and
            gaps in traditional courier services, especially during the post-pandemic boom
            in e-commerce and on-demand deliveries. Early research highlighted that while
            many courier companies in Pakistan offered basic tracking and booking, they
            lacked flexibility, innovation, and support for small businesses. The initial phase
            of the project began with a needs analysis that involved interviewing riders,
            shopkeepers, and regular customers of services like TCS, Leopards, and Bykea.
            The team identified several common issues such as lack of real-time interaction,
            limited service in remote areas, and the absence of a modern user interface.
        </p>
      </div>
    </section>
  );
};

export default History;
