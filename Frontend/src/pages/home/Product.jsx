import axios from "axios";
import { useState, useRef, useContext } from "react";
import { formatMoney } from "../../utils/money";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";

export function Product({ product, loadCart }) {
  const { token } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [authError, setAuthError] = useState(false);
  const timeoutId = useRef(null);

  const addToCart = async () => {
    if (!token) {
      setAuthError(true);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => setAuthError(false), 3000);
      return;
    }
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity
    });

    setAdded(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setAdded(false);
    }, 2000);

    await loadCart();
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (

    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="message-container" style={{ height: '27px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {authError ? (
          <div className="auth-error-msg" style={{ 
            opacity: authError ? 1 : 0, 
            backgroundColor: '#eaf4ee',
            border: '1px solid #1a9e5f',
            borderRadius: '5px',
            padding: '2px 8px',
            color: '#084f2d', 
            fontSize: '12px', 
            textAlign: 'center',
            transition: 'opacity 0.3s',
            width: '100%'
          }}>
            Please <Link to="/login" style={{ color: '#1a9e5f', fontWeight: 'bold', textDecoration: 'underline' }}>log in</Link> to add items.
          </div>
        ) : (
          <div className="added-to-cart" style={{ opacity: added ? 1 : 0, margin: 0 }}>
            <img src="images/icons/checkmark.png" />
            Added
          </div>
        )}
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div >
  );
}