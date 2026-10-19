export default function Header() {
  return (
    <header className="header">
      <div className="container header__in">
        <div className="logo">💡 Svitlo</div>
        <nav className="nav">
          <span className="nav__link nav__link--active">Home</span>
          <span className="nav__link">Catalog</span>
          <span className="nav__link">Cart</span>
        </nav>
      </div>
    </header>
  );
}
