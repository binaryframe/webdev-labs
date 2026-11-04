import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import ErrorMessage from '../components/ErrorMessage';
import PrimaryButton from '../components/PrimaryButton';
import { login } from '../api/auth';

const schema = Yup.object({
  email: Yup.string().required('Email is a required field').email('Email is incorrect'),
  password: Yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters')
});

export default function LoginPage() {
  const navigate = useNavigate();
  const submit = async values => {
    const data = await login(values);
    localStorage.setItem('email', data.email);
    navigate('/');
  };

  return (
    <AuthLayout title="Submit the form to sign in">
      <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={submit}>
        {({ errors, submitCount }) => (
          <Form className="checkout">
            <FormInput label="E-mail" name="email" />
            <FormInput label="Password" name="password" type="password" />
            {submitCount > 0 && <ErrorMessage errors={errors} />}
            <p>Not a member? <Link to="/register">Sign up</Link></p>
            <PrimaryButton type="submit">LOGIN ME</PrimaryButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
