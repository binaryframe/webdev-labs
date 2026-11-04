export default function PrimaryButton({ children, outline, ...rest }) {
  return <button className={`btn ${outline ? 'btn--outline' : ''}`} {...rest}>{children}</button>;
}
