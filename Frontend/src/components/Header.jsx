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
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link" onClick={() => setSearchTerm('')}>
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input 
            className="search-bar" 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-button" onClick={handleSearch}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          {token ? (
            <>
              <div className="header-link" style={{ cursor: 'default' }}>
                <span className="orders-text" style={{ fontWeight: 'normal' }}>Hello, {user?.name?.split(' ')[0]}</span>
              </div>
              <Link className="orders-link header-link" to="/orders">
                <span className="orders-text">Orders</span>
              </Link>
              <Link className="cart-link header-link" to="/checkout">
                <img className="cart-icon" src="images/icons/cart-icon.png" />
                <div className="cart-quantity">{totalQuantity}</div>
                <div className="cart-text">Cart</div>
              </Link>
              <div className="header-link" onClick={() => { logout(); navigate('/'); }}>
                <span className="orders-text" style={{ fontSize: '13px' }}>Sign Out</span>
              </div>
            </>
          ) : (
            <>
              <Link className="header-link sign-in-btn" to="/login">
                <span className="orders-text" style={{ fontWeight: 'normal' }}>Sign In</span>
              </Link>
              <Link className="header-link" style={{ marginLeft: '10px' }} to="/register">
                <span className="orders-text" style={{ color: '#1a9e5f', background: 'white', padding: '5px 10px', borderRadius: '5px' }}>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}