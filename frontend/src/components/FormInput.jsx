import { Field } from 'formik';

export default function FormInput({ label, name, ...rest }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Field className="input" name={name} {...rest} />
    </label>
  );
}
