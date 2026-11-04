export default function ErrorMessage({ errors }) {
  const messages = Object.values(errors);
  if (messages.length === 0) return null;
  return (
    <div className="alert">
      <strong>Oh snap!</strong> Change a few things up and try submitting again.
      <ul>{messages.map(m => <li key={m}>{m}</li>)}</ul>
    </div>
  );
}
