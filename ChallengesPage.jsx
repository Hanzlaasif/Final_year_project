import React from 'react';
import Navbar from '../components/Navbar';
import TCSchall from '../components/TCSchall';
import Chall from '../components/Chall';
import DiffIn from '../components/DiffIn';

export default function ChallengesPage() {
  return (
    <>
      <Navbar />
      <TCSchall />
      <Chall />
      <DiffIn />
    </>
  );
}
