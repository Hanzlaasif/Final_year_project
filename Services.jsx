import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Gamified Tracking",
    icon: "s1.PNG",
    url: "/ex_ser",
    description:
      "Transforms standard parcel tracking into an engaging experience by showing animated delivery progress through a moving mascot or icon on a live map, including milestones such as \"Out for Delivery\" and \"Delivered.\" This keeps users entertained and informed during wait times."
  },
  {
    title: "Courier Traffic",
    icon: "s2.PNG",
    url: "/ex_ser",
    description:
      "Displays real-time traffic congestion, weather conditions, and potential delivery delays on a dynamic map. This helps both riders and customers understand route conditions and estimated delivery times, improving transparency and planning."
  },
  {
    title: "Freelance Marketplace",
    icon: "s3.PNG",
    url: "/ex_ser",
    description:
      "A dedicated space within the platform where verified freelance riders can register, view available delivery jobs, and accept tasks. This supports a flexible delivery workforce model, especially in areas with low courier coverage."
  },
  {
    title: "Community Pickup",
    icon: "s4.PNG",
    url: "/ex_ser",
    description:
      "Allows users to choose trusted local shops as alternative parcel pickup or drop-off locations. This feature reduces last-mile delivery costs and enables more flexible delivery options without requiring lockers."
  },
  {
    title: "Split delivery",
    icon: "s5.PNG",
    url: "/ex_ser",
    description:
      "Enables users to split an order containing multiple parcels into separate delivery types—priority (fast) and standard (regular)—based on urgency. This helps balance cost and convenience for senders."
  },
  {
    title: "QR-based Verification",
    icon: "s6.PNG",
    url: "/ex_ser",
    description:
      "Enhances delivery security by requiring the recipient to show or scan a unique QR code before the parcel is handed over. This feature is useful for confidential, sensitive, or unattended deliveries."
  },
  {
    title: "Tips for Rider",
    icon: "s7.PNG",
    url: "/ex_ser",
    description:
      "After a successful delivery, users can rate the rider’s performance and optionally provide a tip via the platform. This encourages quality service and gives riders recognition for their efforts."
  },
  {
    title: "Small Businessess",
    icon: "s8.PNG",
    url: "/ex_ser",
    description:
      "Offers tools for SMEs to manage their courier needs, including booking bulk shipments, tracking history, downloading invoices, and viewing performance reports —all from a business-focused dashboard."
  }
];

export default function OurServices() {
  return (
    <div className="bg-dark text-white pt-32 pb-12 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-yellow mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {services.map((service, index) => {
          // Add right border except for last column (indexes 3, 7, 11, etc.)
          const isLastColumn = (index + 1) % 4 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col items-center text-center md:pr-6 ${
                !isLastColumn ? "md:border-r-4 border-yellow" : ""
              }`}
            >
            <Link to={service.url}>
                <img src={service.icon} alt="icon" className="w-24 h-24 mb-4" />
            </Link>
              <h3 className="text-xl font-bold text-yellow mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
