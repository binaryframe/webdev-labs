import Hero from '../components/Hero';
import TileList from '../components/TileList';
import PrimaryButton from '../components/PrimaryButton';

const tiles = [
  { title: 'Panel Lights', text: 'Slim and even lighting for offices and homes.' },
  { title: 'Street Lights', text: 'Powerful and reliable lighting for roads and parks.' },
  { title: 'Downlights', text: 'Recessed luminaires for a modern ceiling look.' }
];

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <TileList tiles={tiles} />
      <div className="center"><PrimaryButton>View more</PrimaryButton></div>
    </div>
  );
}
