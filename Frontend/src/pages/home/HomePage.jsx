import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import './HomePage.css'
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  useEffect(() => {

    const getHomeData = async () => {
      const url = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);


  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        {products.length === 0 ? (
          <div className="empty-search-message" style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#555' }}>
            No items found matching your search for: <span style={{ fontWeight: 'bold', color: '#084f2d' }}>"{search}"</span>
          </div>
        ) : (
          <ProductsGrid products={products} loadCart={loadCart} />
        )}
      </div>
    </>
  );
}