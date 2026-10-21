import ImagePlaceholder from './ImagePlaceholder';
import PrimaryButton from './PrimaryButton';

export default function ItemCard({ item }) {
  return (
    <div className="card">
      <ImagePlaceholder className="card__img" />
      <h3>{item.name}</h3>
      <p className="card__text">{item.type} · {item.power} W · {item.manufacturer}</p>
      <div className="card__price"><strong>Price:</strong> <span>${Number(item.price).toFixed(2)}</span></div>
      <PrimaryButton>View more</PrimaryButton>
    </div>
  );
}
