import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PrimaryButton from '../components/PrimaryButton';
import Select from '../components/Select';
import Spinner from '../components/Spinner';
import { getLuminaire, withMinDelay } from '../api/luminaires';
import { colors } from '../constants';

export default function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    setLoading(true);
    withMinDelay(getLuminaire(id)).then(setItem).catch(() => setItem(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container"><Spinner /></div>;
  if (!item) return <div className="container"><p>Item not found.</p></div>;

  return (
    <div className="container item">
      <ImagePlaceholder className="item__img" />
      <div className="item__info">
        <div className="badges">
          <span className="badge">{item.type}</span>
          <span className="badge badge--alt">{item.manufacturer}</span>
        </div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p className="card__text">Power: {item.power} W · LEDs: {item.ledCount}</p>
        <div className="toolbar">
          <label className="field">
            <span className="field__label">Quantity</span>
            <input className="input" type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
          </label>
          <Select label="Color temperature" value={color} onChange={e => setColor(e.target.value)} options={colors} />
        </div>
        <div className="item__bottom">
          <strong>Price: ${(item.price * quantity).toFixed(2)}</strong>
          <div className="item__btns">
            <PrimaryButton outline onClick={() => navigate(-1)}>Go back</PrimaryButton>
            <PrimaryButton onClick={() => { dispatch(addToCart(item, quantity, color)); navigate('/cart'); }}>Add to cart</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
