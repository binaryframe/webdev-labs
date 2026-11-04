import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import ErrorMessage from '../components/ErrorMessage';
import PrimaryButton from '../components/PrimaryButton';
import { register } from '../api/auth';

const schema = Yup.object({
  username: Yup.string().required('Username is a required field').max(30, 'Username must be at most 30 characters'),
  email: Yup.string().required('Email is a required field').email('Email is incorrect'),
  password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
  repeat: Yup.string().required('Retype password is a required field').oneOf([Yup.ref('password')], 'Passwords do not match')
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const submit = async values => {
    const data = await register(values);
    localStorage.setItem('email', data.email);
    navigate('/');
  };

  return (
    <AuthLayout title="Register the new account">
      <Formik initialValues={{ username: '', email: '', password: '', repeat: '' }} validationSchema={schema} onSubmit={submit}>
        {({ errors, submitCount }) => (
          <Form className="checkout">
            <FormInput label="Username" name="username" />
            <FormInput label="E-mail" name="email" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput label="Retype password" name="repeat" type="password" />
            {submitCount > 0 && <ErrorMessage errors={errors} />}
            <p>Already a member? <Link to="/login">Sign in</Link></p>
            <PrimaryButton type="submit">SIGN ME UP</PrimaryButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
