import { NavLink, useNavigate } from 'react-router-dom';

const cls = ({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`;

export default function Header() {
  const navigate = useNavigate();
  const signOut = () => { localStorage.removeItem('email'); navigate('/login'); };
  return (
    <header className="header">
      <div className="container header__in">
        <div className="logo">💡 Svitlo</div>
        <nav className="nav">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/catalog" className={cls}>Catalog</NavLink>
          <NavLink to="/cart" className={cls}>Cart</NavLink>
        </nav>
        <button className="btn btn--outline" onClick={signOut}>Sign me out</button>
      </div>
    </header>
  );
}
