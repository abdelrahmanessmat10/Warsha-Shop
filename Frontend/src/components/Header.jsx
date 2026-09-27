import { cartQuantity } from '../utils/cartQuantity';
import { Link, useNavigate } from 'react-router'
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './header.css'

export function Header({ cart }) {
  const { user, token, logout } = useContext(AuthContext);
  const totalQuantity = cartQuantity(cart);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    } else {
      navigate(`/`);
    }
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="header-link logo-link" onClick={() => setSearchTerm('')} title="Warsha Shop">
          <img className="logo" src="images/logo-white.png" alt="Warsha Shop" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Warsha Shop" />
        </Link>
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search Warsha Shop..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search"
        />

        <button className="search-button" onClick={handleSearch} aria-label="Search button">
          <img className="search-icon" src="images/icons/search-icon.png" alt="" />
        </button>
      </div>

      <div className="right-section">
        {token ? (
          <>
            <div className="header-link user-greeting" title={user?.name}>
              <span className="orders-text greeting-text">Hello, {user?.name?.split(' ')[0]}</span>
            </div>
            <Link className="orders-link header-link" to="/orders" title="Your Orders">
              <span className="orders-text">Orders</span>
            </Link>
            <Link className="cart-link header-link" to="/checkout" aria-label="Cart">
              <div className="cart-icon-container">
                <img className="cart-icon" src="images/icons/cart-icon.png" alt="" />
                <div className="cart-quantity">{totalQuantity}</div>
              </div>
              <div className="cart-text">Cart</div>
            </Link>
            <div className="header-link sign-out-btn" onClick={() => { logout(); navigate('/'); }} title="Sign Out">
              <span className="orders-text sign-out-text">Sign Out</span>
            </div>
          </>
        ) : (
          <>
            <Link className="header-link sign-in-btn" to="/login">
              <span className="orders-text sign-in-text">Sign In</span>
            </Link>
            <Link className="header-link register-btn" to="/register">
              <span className="orders-text register-text">Register</span>
            </Link>
            <Link className="cart-link header-link" to="/checkout" aria-label="Cart">
              <div className="cart-icon-container">
                <img className="cart-icon" src="images/icons/cart-icon.png" alt="" />
                <div className="cart-quantity">{totalQuantity}</div>
              </div>
              <div className="cart-text">Cart</div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}