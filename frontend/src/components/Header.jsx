import { NavLink } from 'react-router-dom';

const cls = ({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`;

export default function Header() {
  return (
    <header className="header">
      <div className="container header__in">
        <div className="logo">💡 Svitlo</div>
        <nav className="nav">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/catalog" className={cls}>Catalog</NavLink>
          <NavLink to="/cart" className={cls}>Cart</NavLink>
        </nav>
      </div>
    </header>
  );
}
