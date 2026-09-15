import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import './App.css'

function App() {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  }

  useEffect(() => {
    loadCart();
  }, [token])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/checkout" element={token ? <CheckoutPage cart={cart} loadCart={loadCart} /> : <LoginPage />} />
      <Route path="/orders" element={token ? <OrdersPage cart={cart} loadCart={loadCart} /> : <LoginPage />} />
      <Route path="/tracking/:orderId/:productId" element={token ? <TrackingPage cart={cart} /> : <LoginPage />} />
    </Routes>

  )
}

export default App
