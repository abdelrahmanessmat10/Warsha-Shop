import axios from 'axios'
import { formatMoney } from "../../utils/money";
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(cartItem.quantity);

  const DeleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const SaveQuantity = async () => {
    if (tempQuantity <= 0) {
      await DeleteCartItem();
      return;
    }

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: tempQuantity
    });
    await loadCart();
    setIsEditing(false);
  }

  return (
    <div className="cart-item-details">
      <div className="product-name">
        {cartItem.product.name}
      </div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <span>
          Quantity: {' '}
          {isEditing ? (
            <input
              type="number"
              className="quantity-input"
              value={tempQuantity}
              min="0"
              style={{ width: '40px' }}
              onChange={(e) => setTempQuantity(Number(e.target.value))}
            />
          ) : (
            <span className="quantity-label">{cartItem.quantity}</span>
          )}
        </span>
        {isEditing ? (
          <span className="save-quantity-link link-primary" onClick={SaveQuantity}>
            Save
          </span>
        ) : (
          <span className="update-quantity-link link-primary" onClick={() => {
            setIsEditing(true);
            setTempQuantity(cartItem.quantity);
          }}>
            Update
          </span>
        )}
        <span className="delete-quantity-link link-primary" onClick={DeleteCartItem}>
          Delete
        </span>
      </div>
    </div>
  );
}