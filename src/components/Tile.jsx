import ImagePlaceholder from './ImagePlaceholder';

export default function Tile({ title, text }) {
  return (
    <div className="tile">
      <ImagePlaceholder className="tile__img" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
