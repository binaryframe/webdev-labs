import Tile from './Tile';

export default function TileList({ tiles }) {
  return <div className="tiles">{tiles.map(t => <Tile key={t.title} {...t} />)}</div>;
}
