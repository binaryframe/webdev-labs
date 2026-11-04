import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import ErrorMessage from '../components/ErrorMessage';
import PrimaryButton from '../components/PrimaryButton';
import { clearCart } from '../redux/actions';

const schema = Yup.object({
  firstName: Yup.string()
    .required('First name is a required field')
    .max(30, 'First name must be at most 30 characters')
    .matches(/^[A-Za-z' -]+$/, 'First name must contain only letters'),
  lastName: Yup.string()
    .required('Last name is a required field')
    .max(30, 'Last name must be at most 30 characters')
    .matches(/^[A-Za-z' -]+$/, 'Last name must contain only letters'),
  email: Yup.string()
    .required('Email is a required field')
    .email('Email is incorrect (example: name@mail.com)'),
  phone: Yup.string().matches(/^(\+?\d{10,13})?$/, 'Phone must contain 10-13 digits and may start with +'),
  address: Yup.string()
    .required('Address is a required field')
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be at most 100 characters')
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Checkout</h1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', phone: '', address: '' }}
        validationSchema={schema}
        onSubmit={() => { dispatch(clearCart()); navigate('/success'); }}
      >
        {({ errors, submitCount }) => (
          <Form className="checkout">
            <div className="checkout__row">
              <FormInput label="First Name" name="firstName" />
              <FormInput label="Last Name" name="lastName" />
            </div>
            <div className="checkout__row">
              <FormInput label="Email" name="email" />
              <FormInput label="Phone" name="phone" />
            </div>
            <FormInput label="Address" name="address" />
            {submitCount > 0 && <ErrorMessage errors={errors} />}
            <div className="cart-actions">
              <PrimaryButton type="button" outline onClick={() => navigate('/cart')}>Go Back</PrimaryButton>
              <PrimaryButton type="submit">Continue</PrimaryButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
