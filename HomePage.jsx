import React from 'react';
import Navbar from '../components/Navbar';
import WhatsApp from '../components/Whatsapp';
import Banner from '../components/Banner';
import Introduction from '../components/Introduction';
import History from '../components/History';
import Services from '../components/Services';
import OrderMode from '../components/OrderMode';
import Technology from '../components/Technology';
import TCSchall from '../components/TCSchall';
import Chall from '../components/Chall';
import DiffIn from '../components/DiffIn';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <WhatsApp />
      <Navbar />
      <Banner />
      <Introduction />
      <History />
      <Services />
      <OrderMode />
      <Technology />
      <TCSchall />
      <Chall />
      <DiffIn />
      <Contact />

    </>
  );
}
