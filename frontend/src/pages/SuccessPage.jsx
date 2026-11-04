import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

export default function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="container success">
      <div className="success__icon">✔</div>
      <h1>Success!</h1>
      <p>Your order was sent to processing!<br />Check your email box for further information.</p>
      <PrimaryButton onClick={() => navigate('/catalog')}>Go back to Catalog</PrimaryButton>
    </div>
  );
}
