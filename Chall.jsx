import React from 'react';

export default function Chall() {
  return (
    <section className="bg-dark text-white px-6 py-12 md:px-20">
      <h2 className="text-5xl font-bold text-yellow mb-10 leading-tight">
        Challenges in <br /> Courier360
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image Column */}
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow"></div>
          <img
            src="/17e.png"
            alt="Courier Challenges"
            className="w-full object-cover rounded shadow-lg"
          />
        </div>

        {/* Text Column */}
        <div className="space-y-6 text-sm text-gray-300">
          <p>
            Leopards is a strong local competitor with widespread operations across 
            Pakistan and established relationships with corporate clients. Its challenge 
            to Courier360 lies in its deep market penetration and traditional service 
            reliability. While Leopards lacks advanced features like gamified tracking 
            or QR-based security, it still dominates due to volume handling capabilities 
            and a recognizable brand. Courier360 must differentiate itself through a better 
            digital experience and customer-centric innovations to attract users who want more 
            flexibility and transparency.
          </p>
          <p>
            DHL, being a global logistics giant, offers advanced tracking, international delivery, 
            warehousing, and enterprise logistics solutions. Competing with DHL is not feasible for 
            Courier360 at the same scale, especially in international shipping. DHL’s challenge 
            to Courier360 is in terms of global reach, corporate trust, and premium logistics 
            capabilities. However, Courier360 can focus on the local/regional market and small 
            business segment with features DHL does not prioritize—like Shop2Shop pickup, rider 
            marketplaces, and white-label branding.
          </p>
          <p>
            M&P, known for pharmaceutical and consumer logistics, also offers courier services 
            with over 1600 locations across Pakistan. While M&P is efficient and structured, it 
            lacks some customer-facing innovations. Courier360 faces the challenge of matching M&P’s 
            operational discipline and national coverage. However, Courier360’s focus on freelance 
            riders, real-time analytics, and mobile-first design offers a more modern experience, 
            especially for tech-savvy users and small business owners.
          </p>
        </div>
      </div>
    </section>
  );
}
