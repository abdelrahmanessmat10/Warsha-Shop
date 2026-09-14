import { DeliveryOption } from './DliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
import { Link } from 'react-router';


export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '25px' }}>Your cart is empty.</div>
        <Link to="/">
          <button className="button-primary" style={{ padding: '12px 40px', fontSize: '16px', borderRadius: '5px' }}>
            View Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId;
        });
        return (
          <>
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={cartItem.product.image} />

                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
              </div>
            </div>
          </>
        );

      })}

    </div>

  );
}