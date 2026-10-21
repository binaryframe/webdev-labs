export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__in">
          <div>
            <strong>Svitlo</strong>
            <p className="footer__text">Quality luminaires for your home, street and business.</p>
          </div>
          <div className="logo">💡 Svitlo</div>
          <div className="socials">
            {['f', 't', 'in', 'G'].map(s => <span key={s} className="social">{s}</span>)}
          </div>
        </div>
        <div className="copy">2020 Svitlo © Copyright all rights reserved</div>
      </div>
    </footer>
  );
}
