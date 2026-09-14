import { Link } from 'react-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import './TrackingPage.css'
import { Header } from '../components/Header';
export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [trackingProduct, setTrackingProduct] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        const orderData = response.data;

        const specificProduct = orderData.products.find(
          (item) => item.productId === productId
        );
        setTrackingProduct(specificProduct);
        setOrderData(orderData);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      }
    }


    fetchTrackingData();


  }, [orderId, productId]);

  if (!trackingProduct || !orderData) {
    return <div>Loading tracking details...</div>;
  }

  // Calculate Progress Percentage
  const currentTime = Date.now();
  const orderTime = orderData.orderTimeMs;
  const deliveryTime = trackingProduct.estimatedDeliveryTimeMs;

  const totalDeliveryTime = deliveryTime - orderTime;
  const timePassed = currentTime - orderTime;

  let progressPercent = (timePassed / totalDeliveryTime) * 100;

  // Make sure it stays between 0 and 100
  if (progressPercent < 0) progressPercent = 0;
  if (progressPercent > 100) progressPercent = 100;

  // Determine which label gets the "current-status" class
  const isPreparing = progressPercent < 50;
  const isShipped = progressPercent >= 50 && progressPercent < 100;
  const isDelivered = progressPercent >= 100;

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {trackingProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {trackingProduct.quantity}
          </div>

          <img className="product-image" src={trackingProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

    </>

  );
}