import axios from 'axios'
import dayjs from "dayjs";
import { useState } from 'react';
import { Form, Link } from 'react-router'
import { Fragment } from "react";
export function OrderDetailsGrid({ order, loadCart }) {
  const [addedProductId, setAddedProductId] = useState(null);

  const buyAgain = async (productId) => {
    try {
      await axios.post('/api/cart-items', {
        productId: productId,
        quantity: 1
      });

      loadCart();

      setAddedProductId(productId);
      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);

    } catch (error) {
      console.error("Failed to add to cart:", error);
    }

  }


  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={() => buyAgain(orderProduct.product.id)}>
                <img className="buy-again-icon" src={addedProductId === orderProduct.product.id ? "images/icons/checkmark-white.png" : "images/icons/buy-again.png"} />
                <span className="buy-again-message">
                  {addedProductId === orderProduct.product.id ? "Added to Cart" : "Buy Again"}
                </span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={'/tracking/' + order.id + '/' + orderProduct.product.id}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>

        );
      })}
    </div>

  );
}