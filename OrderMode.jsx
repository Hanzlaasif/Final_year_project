import React from 'react';
import { Link } from 'react-router-dom';

const orderMode = [
  {
    label: 'Road Mode',
    image: 'r1.png',
    url: '/roadOption',
  },
  {
    label: 'Air Mode',
    image: '17a.png', 
    url: '/form',
  },
  {
    label: 'Sea Mode',
    image: '18b.png', 
    url: '/form',
  },
];

export default function OrderMode() {
  return (
    <section className="bg-dark text-white px-4 py-32 md:px-20">
      <h2 className="text-4xl font-bold text-yellow mb-10">
        Order Place modes in Courier360
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {orderMode.map((mode, index) => (
          <div key={index} className="text-center">
            <Link to={mode.url}>
              <img
                src={mode.image}
                alt={mode.label}
                className="w-full h-[250px] object-cover rounded hover:opacity-90 transition"
              />
            </Link>
            <p className="mt-4 text-lg font-semibold text-[#f5b620]">
              {mode.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
