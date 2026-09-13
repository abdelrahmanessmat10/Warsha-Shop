import axios from 'axios'
import { useEffect, useState } from 'react'
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css'


export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');

      setDeliveryOptions(response.data);

    };

    fetchDeliveryOptions();


  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary')

      setPaymentSummary(response.data);
    };

    fetchPaymentSummary();


  }, [cart])



  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />


      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}