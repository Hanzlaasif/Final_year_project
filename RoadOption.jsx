import React from 'react';
import { Link } from 'react-router-dom';


const roadOption = [
  {
    label: 'Bike',
    image: '17.png', 
    url: '/form',
  },
  {
    label: 'Pick-up',
    image: '18.png',
    url: '/form',
  },
  {
    label: 'Truck',
    image: 'r1.png',
    url: '/form',
  },
];

export default function RoadOption() {
  return (
    <section className="bg-dark text-white h-screen px-4 py-20 md:px-20">
      <h2 className="text-4xl font-bold text-yellow mb-10">
        Order Place on Road Mode
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {roadOption.map((option, index) => (
          <div key={index} className="text-center">
            <Link to={option.url}>
            <img
              src={option.image}
              alt={option.label}
              className="w-full h-[250px] object-cover rounded"
            />
            </Link>
            <p className="mt-4 text-lg font-semibold text-[#f5b620]">
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
