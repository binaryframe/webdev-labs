import { useState } from 'react';
import Hero from '../components/Hero';
import TileList from '../components/TileList';
import PrimaryButton from '../components/PrimaryButton';

const tiles = [
  { title: 'Panel Lights', text: 'Slim and even lighting for offices and homes.' },
  { title: 'Street Lights', text: 'Powerful and reliable lighting for roads and parks.' },
  { title: 'Downlights', text: 'Recessed luminaires for a modern ceiling look.' },
  { title: 'Flood Lights', text: 'Bright light for facades, yards and parking.' },
  { title: 'Track Lights', text: 'Flexible spots for shops and galleries.' },
  { title: 'High Bay Lights', text: 'Industrial lighting for warehouses and factories.' }
];

export default function HomePage() {
  const [count, setCount] = useState(3);

  return (
    <div className="container">
      <Hero />
      <TileList tiles={tiles.slice(0, count)} />
      {count < tiles.length && (
        <div className="center"><PrimaryButton onClick={() => setCount(count + 3)}>View more</PrimaryButton></div>
      )}
    </div>
  );
}
