import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PrimaryButton from '../components/PrimaryButton';
import { increment, decrement } from '../redux/actions';

export default function CartPage() {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>
      {items.length === 0 && <p className="title">Your cart is empty.</p>}
      {items.map(i => (
        <div className="cart-row" key={i.key}>
          <ImagePlaceholder className="cart-row__img" />
          <strong className="cart-row__name">{i.name} <span className="cart-row__color">({i.color})</span></strong>
          <div className="qty">
            <PrimaryButton outline onClick={() => dispatch(decrement(i.key))}>-</PrimaryButton>
            <span>{i.quantity}</span>
            <PrimaryButton outline onClick={() => dispatch(increment(i.key))}>+</PrimaryButton>
          </div>
          <span className="cart-row__price">${(i.price * i.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="cart-total">Total amount: <strong>${total.toFixed(2)}</strong></div>
      <div className="cart-actions">
        <PrimaryButton outline onClick={() => navigate('/catalog')}>Back to Catalog</PrimaryButton>
        <PrimaryButton disabled={items.length === 0}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
