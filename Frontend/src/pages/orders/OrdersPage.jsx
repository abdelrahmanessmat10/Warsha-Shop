import axios from 'axios';
import { useEffect, useState, Fragment } from 'react'
import { Header } from '../../components/Header';
import './OrdersPage.css'
import { Form, Link } from 'react-router'
import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
    }
    fetchOrdersData();

  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length > 0 && orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <OrderHeader order={order} />

                <OrderDetailsGrid order={order} />

              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}