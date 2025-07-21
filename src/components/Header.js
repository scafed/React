import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Tienda de Videojuegos Logo" height="60" className="me-2" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            <Link className="nav-link text-light position-relative me-3" to="/cart">
              <FaShoppingCart size="1.2em" />
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="navbar-text me-3">
                  <FaUser className="me-1" /> Hola {user.username}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  <FaSignOutAlt /> Salir
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-success btn-sm">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;